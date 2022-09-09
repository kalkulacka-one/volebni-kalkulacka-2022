#!/usr/bin/env python

import argparse
import json
import logging
from pathlib import Path
import sys
from typing import Optional

import requests

logger = logging.getLogger()
logger.setLevel(logging.INFO)
handler = logging.StreamHandler(sys.stderr)
handler.setLevel(logging.INFO)
logger.addHandler(handler)


def get_dir_to_api(dir_name: str) -> Optional[str]:
    return {
        "senatni-2022": (
            "https://2022.programydovoleb.cz/lib/app/api.php?action=senate/fetch/"
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
        base_url = get_dir_to_api(dir_name)
        if not base_url:
            logger.warning("Unsupported directory: %s", dir_name)
            continue
        response = requests.get(f"{base_url}{district_code}")
        if response.status_code != 200:
            logger.warning(
                "API call has failed: %s, %s", response.url, response.status_code
            )
            continue
        api_json = response.json()
        changes = False
        with data_file.open("r") as fh:
            data_json = json.load(fh)
            description = api_json.get("about", {}).get("description")
            if description and data_json["description"] != description:
                data_json["description"] = description
                changes = True

            api_list = api_json.get("list")
            if not api_list:
                api_list = api_json.get("town", {}).get("list")
            if not api_list:
                logger.warning("No candidate list in API json: %s", repr(api_json))
                continue
            # logger.info(repr(api_list))

        if changes:
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
