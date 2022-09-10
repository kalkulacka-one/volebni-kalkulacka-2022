#!/usr/bin/env python

import argparse
import json
import logging
from pathlib import Path
import sys
from typing import Any, Callable, Optional

import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)


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
        local_path = avatar_dir / f"{candidate['id']}.{remote_url.split('.')[-1]}"
        if not local_path.exists():
            logger.info("\t%s - downloading from %s", local_path.absolute(), remote_url)
            response = requests.get(remote_url)
            with local_path.open("wb") as fh:
                fh.write(response.content)
            img_url = "/".join(str(local_path.absolute()).split("/")[-5:])
            if not candidate.get("img_url") or candidate["img_url"] != img_url:
                logger.info("\tsetting img_url to %s", img_url)
                candidate["img_url"] = img_url
                was_changed = True
        else:
            logger.info(
                "\t%s - already downloaded from %s", local_path.absolute(), remote_url
            )

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
