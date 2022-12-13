#!/usr/bin/env python3

import argparse
import json
import logging
import os
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

DParties = dict[int, dict[str, Any]]


def add_element(struct: dict[str, Any], key: str, val: Optional[Any]) -> None:
    if val is not None:
        struct[key] = val


def local_path_to_web_path(path: Path, data_dir: Path) -> str:
    common = os.path.commonpath(
        [
            path.absolute(),
            data_dir.absolute(),
        ]
    )

    return "/" + "/".join(
        [
            str(data_dir.absolute()).split("/")[-1],
            str(path.absolute())[len(common) + 1 :],
        ]
    )


def extract_img_url(party_dir: Path, logo_path: str, data_dir: Path) -> Optional[str]:
    remote_url = f"https://data.programydovoleb.cz/{logo_path}"
    img_name = logo_path.split("/")[-1]
    local_path = party_dir / img_name
    if not local_path.exists():
        response = requests.get(remote_url)
        if response.status_code != 200:
            logger.warning(
                "Downloading img_url has failed: %s, %s",
                response.url,
                response.status_code,
            )
            return None
        with local_path.open("wb") as fh:
            fh.write(response.content)

    return local_path_to_web_path(local_path, data_dir)


def update_candidate_parties(
    candidate: dict[str, Any],
    data_dir: Path,
    party_dir: Path,
    coalitions: list[int],
    parties: DParties,
) -> bool:
    if coalitions:
        candidate["parties"] = []
    for c in coalitions:
        party = parties.get(c)
        if not party:
            logger.warning("Unknown party %d for candidate %s", c, candidate)
            continue

        gen_party = {
            "id": f"party-{c}",
            "name": party["name"],
            "short_name": party["short"],
            "abbreviation": party["short"],
            "description": party["name"],
            "contacts": [],
        }
        if "logo" in party:
            img_url = extract_img_url(party_dir, party["logo"], data_dir)
            add_element(gen_party, "img_url", img_url)

        candidate["parties"].append(gen_party)
    return True


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

        for scale_factor in [1.1, 1.2, 1.4, 0.9]:
            # Detect faces in the image
            faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=scale_factor,
                minNeighbors=5,
                minSize=(30, 30)
                # flags = cv2.CV_HAAR_SCALE_IMAGE
            )

            logger.info(
                "Found %d faces in %s with scale factor %f",
                len(faces),
                source,
                scale_factor,
            )
            if len(faces) != 1:
                continue
            (x, y, w, h) = faces[0]
            left = int(x - 0.22 * w)
            right = int(x + 1.22 * w)
            top = int(y - 0.30 * h)
            bottom = int(y + 1.14 * h)
            cropped = image[top:bottom, left:right]
            # based on figma there is 72x72 and 48x48 version
            new_width = 96
            new_height = int(1 / ((right - left) / new_width) * (bottom - top))
            logger.info(
                "Face %s extracted: %d,%d => %d, %d (%.3f, %.3f)",
                source,
                w,
                h,
                new_width,
                new_height,
                w / new_width,
                h / new_height,
            )
            resized = cv2.resize(
                cropped, (new_height, new_width), interpolation=cv2.INTER_LINEAR
            )
            cv2.imwrite(str(target.absolute()), resized)
            return True
    except cv2.error as e:
        logger.error("Cannot generate face from %s, %s", source, e)
        return False

    return False


def update_candidate_photo(
    candidate: dict[str, Any],
    candidate_name: str,
    data_dir: Path,
    avatar_dir: Path,
    photos: list[dict[str, Any]],
    detect_face: bool = False,
) -> bool:
    if not photos:
        logger.info("\tSkipping, no photos for %s", candidate_name)
        return False

    remote_url = photos[0]["url"]
    if not remote_url.startswith("http"):
        # sometimes there is just local path
        remote_url = f"https://data.programydovoleb.cz/{remote_url}"

    image_suffix = remote_url.split(".")[-1]
    local_original_path = avatar_dir / f"{candidate['id']}-original.{image_suffix}"
    local_face_path = avatar_dir / f"{candidate['id']}-face.{image_suffix}"
    used_path = None
    if not local_original_path.exists():
        logger.info(
            "\t%s - downloading from %s", local_original_path.absolute(), remote_url
        )
        response = requests.get(remote_url)
        if response.status_code != 200:
            logger.warning(
                "Downloading of candidate photo has failed: %s, %s",
                response.url,
                response.status_code,
            )
            return False
        with local_original_path.open("wb") as fh:
            fh.write(response.content)

    else:
        logger.info(
            "\t%s - already downloaded from %s",
            local_original_path.absolute(),
            remote_url,
        )

    if detect_face:
        if not local_face_path.exists():
            logger.info(
                "\t%s - extracting face from %s",
                local_face_path.absolute(),
                local_original_path.absolute(),
            )
            extract_face(local_original_path, local_face_path)
        else:
            logger.info(
                "\t%s - already extracted face from %s",
                local_face_path.absolute(),
                local_original_path.absolute(),
            )
    else:
        logger.info(
            "\t%s - skipping extracting face from %s",
            local_face_path.absolute(),
            local_original_path.absolute(),
        )

    # update JSON file
    if local_original_path.exists():
        used_path = local_original_path

    if local_face_path.exists():
        used_path = local_face_path

    if used_path:
        img_url = local_path_to_web_path(used_path, data_dir)
        if not candidate.get("img_url") or candidate["img_url"] != img_url:
            logger.info("\tsetting img_url to %s", img_url)
            candidate["img_url"] = img_url
            return True

    return False


def process_senatni(
    data_json: dict[str, Any],
    api_json: dict[str, Any],
    parties: DParties,
    data_dir: Path,
    avatar_dir: Path,
    party_dir: Path,
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

        was_changed = (
            update_candidate_photo(
                candidate,
                candidate_name,
                data_dir,
                avatar_dir,
                candidates_api[candidate_name]["custom"]["photo"],
                True,
            )
            or was_changed
        )

        was_changed = (
            update_candidate_parties(
                candidate,
                data_dir,
                party_dir,
                candidates_api[candidate_name]["csu"]["main"]["coalition"],
                parties,
            )
            or was_changed
        )

    return was_changed


def process_komunalni(
    data_json: dict[str, Any],
    api_json: dict[str, Any],
    parties: DParties,
    data_dir: Path,
    avatar_dir: Path,
    party_dir: Path,
) -> bool:
    was_changed = False
    api_list = api_json.get("town", {}).get("list")
    if not api_list:
        logger.warning("No candidate list in API json: %s", repr(api_json))
        return was_changed

    candidates_api = {}
    for item in api_list:
        main = item["csu"]["main"]
        candidates_api[main["party_name"].lower()] = item

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

        was_changed = (
            update_candidate_photo(
                candidate,
                candidate_name,
                data_dir,
                avatar_dir,
                candidates_api[candidate_name]["custom"]["logo"],
                False,
            )
            or was_changed
        )

        was_changed = (
            update_candidate_parties(
                candidate,
                data_dir,
                party_dir,
                candidates_api[candidate_name]["csu"]["main"]["party_coalition"],
                parties,
            )
            or was_changed
        )

    return was_changed


def get_dir_mapping(
    dir_name: str,
) -> Optional[tuple[str, Callable[[dict, dict, DParties, Path, Path, Path], bool]]]:
    return {
        "senatni-2022": (
            "https://2022.programydovoleb.cz/lib/app/api.php?action=senate/fetch/",
            process_senatni,
        ),
        "komunalni-2022": (
            "https://2022.programydovoleb.cz/lib/app/api.php?action=town/fetch/",
            process_komunalni,
        ),
    }.get(dir_name)


def process(calculators_dir: Path, data_dir: Path, dir_name: str, parties: DParties):
    avatars_root_dir = data_dir / "avatars"
    calc_dir = calculators_dir / dir_name
    avatar_dir = avatars_root_dir / dir_name
    avatar_dir.mkdir(parents=True, exist_ok=True)
    party_dir = avatars_root_dir / "parties"
    party_dir.mkdir(parents=True, exist_ok=True)

    logger.info(
        "calc dir: %s, avatar dir: %s, party_dir: %s", calc_dir, avatar_dir, party_dir
    )
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
            was_changed = callback(
                data_json, api_json, parties, data_dir, district_dir, party_dir
            )

        if was_changed:
            with data_file.open("w") as fh:
                json.dump(data_json, fh, indent=2, ensure_ascii=False)


def load_parties() -> DParties:
    response = requests.get(
        "https://2022.programydovoleb.cz/lib/app/api.php?action=party/list"
    )
    if response.status_code != 200:
        logger.warning(
            "API call has failed: %s, %s", response.url, response.status_code
        )
        exit(1)
    api_json = response.json()
    parties = {}
    for p in api_json["list"]:
        parties[p["reg"]] = p

    return parties


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

    parties = load_parties()

    for p in calculators_dir.glob("*"):
        if p.is_dir():
            process(calculators_dir, data_dir, p.name, parties)
