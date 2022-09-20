#!/usr/bin/env python

import argparse
import json
import logging
from pathlib import Path
import sys
from typing import Any, Callable, Optional

import cv2
import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)


def extract_face(source: Path, target: Path) -> bool:
    # https://github.com/shantnu/FaceDetect/blob/master/face_detect_cv3.py
    # Get user supplied values
    cascPath = "haarcascade_frontalface_default.xml"

    # Create the haar cascade
    faceCascade = cv2.CascadeClassifier(cascPath)

    # Read the image
    try:
        image = cv2.imread(str(source.absolute()))
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Detect faces in the image
        faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
            # flags = cv2.CV_HAAR_SCALE_IMAGE
        )

        logger.info("Found %d faces in %s", len(faces), source)
        if len(faces) != 1:
            return False
        (x, y, w, h) = faces[0]
        left = int(x - 0.2 * w)
        right = int(x + 1.2 * w)
        top = int(y - 0.32 * h)
        bottom = int(y + 1.20 * h)
        cropped = image[top:bottom, left:right]
        # based on figma there is 72x72 and 48x48 version
        new_width = 96
        new_height = int(1 / ((right - left) / new_width) * (bottom - top))
        resized = cv2.resize(
            cropped, (new_height, new_width), interpolation=cv2.INTER_LINEAR
        )
        cv2.imwrite(str(target.absolute()), resized)
        return True
    except cv2.error as e:
        logger.error("Cannot generate face from %s, %s", source, e)
        return False


def process_senatni(
    data_json: dict[str, Any], api_json: dict[str, Any], avatar_dir: Path
) -> bool:
    was_changed = False
    description = api_json.get("about", {}).get("description")
    if description and data_json["description"] != description:
        data_json["description"] = description
        was_changed = True

    api_list = api_json.get("list")
    if not api_list:
        logger.warning("No candidate list in API json: %s", repr(api_json))
        return was_changed

    candidates_api = {}
    for item in api_list:
        main = item["csu"]["main"]
        candidates_api[f"{main['cand_name']} {main['cand_family']}".lower()] = item

    for candidate in data_json["candidates"]:
        candidate_name = candidate["name"].lower()
        logger.info("Processing candidate: %s", candidate_name)
        if candidate_name not in candidates_api:
            logger.error(
                "Candidate %s not in API. Known candidates: %s",
                candidate["name"].lower(),
                list(candidates_api.keys()),
            )
            continue
        photos = candidates_api[candidate_name]["custom"]["photo"]
        if not photos:
            logger.info("\tSkipping, no photos for %s", candidate_name)
            continue

        remote_url = photos[0]["url"]
        image_suffix = remote_url.split(".")[-1]
        local_original_path = avatar_dir / f"{candidate['id']}-original.{image_suffix}"
        local_face_path = avatar_dir / f"{candidate['id']}-face.{image_suffix}"
        used_path = None
        if not local_original_path.exists():
            logger.info(
                "\t%s - downloading from %s", local_original_path.absolute(), remote_url
            )
            response = requests.get(remote_url)
            with local_original_path.open("wb") as fh:
                fh.write(response.content)

            if not local_face_path.exists():
                extract_face(local_original_path, local_face_path)
        else:
            logger.info(
                "\t%s - already downloaded from %s",
                local_original_path.absolute(),
                remote_url,
            )

        # update JSON file
        if local_original_path.exists():
            used_path = local_original_path

        if local_face_path.exists():
            used_path = local_face_path

        if used_path:
            img_url = "/".join(str(used_path.absolute()).split("/")[-5:])
            if not candidate.get("img_url") or candidate["img_url"] != img_url:
                logger.info("\tsetting img_url to %s", img_url)
                candidate["img_url"] = img_url
                was_changed = True

    return was_changed


def get_dir_mapping(
    dir_name: str,
) -> Optional[tuple[str, Callable[[dict, dict, Path], bool]]]:
    return {
        "senatni-2022": (
            "https://2022.programydovoleb.cz/lib/app/api.php?action=senate/fetch/",
            process_senatni,
        ),
        # "komunalni-2022": (
        #     "https://2022.programydovoleb.cz/lib/app/api.php?action=town/fetch/"
        # ),
    }.get(dir_name)


def process(calculators_dir: Path, avatars_root_dir: Path, dir_name: str):
    calc_dir = calculators_dir / dir_name
    avatar_dir = avatars_root_dir / dir_name
    avatar_dir.mkdir(parents=True, exist_ok=True)
    logger.info("calc dir: %s, avatar dir: %s", calc_dir, avatar_dir)
    for data_file in calc_dir.glob("*.json"):
        district_code = data_file.name[:-5]
        logger.info("Processing %s (%s)", data_file, district_code)
        mapping = get_dir_mapping(dir_name)
        if not mapping:
            logger.warning("Unsupported directory: %s", dir_name)
            continue
        (base_url, callback) = mapping
        response = requests.get(f"{base_url}{district_code}")
        if response.status_code != 200:
            logger.warning(
                "API call has failed: %s, %s", response.url, response.status_code
            )
            continue
        api_json = response.json()

        district_dir = avatar_dir / district_code
        district_dir.mkdir(parents=True, exist_ok=True)
        with data_file.open("r") as fh:
            data_json = json.load(fh)
            was_changed = callback(data_json, api_json, district_dir)

        if was_changed:
            with data_file.open("w") as fh:
                json.dump(data_json, fh, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--data",
        help="Output folder",
        default="../data/",
    )

    args = parser.parse_args()
    data_dir = Path(args.data)
    calculators_dir = data_dir / "kalkulacka"
    avatars_dir = data_dir / "avatars"

    for p in calculators_dir.glob("*"):
        if p.is_dir():
            process(calculators_dir, avatars_dir, p.name)
