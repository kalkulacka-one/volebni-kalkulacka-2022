#!/usr/bin/env python3

import argparse
from pathlib import Path
from typing import Callable, Dict, Optional

from gspread import Client
from gspread import service_account

from generator import logger
from generator.generate import generate
from generator.komunalni_2022 import extract_election_komunalni
from generator.senatni_2022 import extract_election_senat
from generator.types import Election
from generator.types import SheetRow

EXTRACT = {
    "senatni-2022": extract_election_senat,
    "komunalni-2022": extract_election_komunalni,
}  # type: Dict[str, Callable[[Client, SheetRow, int, Optional[Election]], Election]]


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--wait",
        type=float,
        help="Wait the specified number of seconds between requests to Google Sheet",
        default=5.0,
    )
    parser.add_argument(
        "--doc-key",
        help="Google Sheet key for parties",
        default="1-VqiamcH8phGtg2glC2FcOyxvYrXSaNiir1mMlVEXPs",
    )
    parser.add_argument(
        "--output",
        help="Output folder",
        default="../data/kalkulacka",
    )
    parser.add_argument(
        "--keys", help="List of keys that should be extracted.", nargs="+", default=[]
    )

    # TODO: there should be some sheet or additional parameters
    # describing voting districts

    args = parser.parse_args()

    logger.info(
        f"Convert: wait={args.wait}; doc-key={args.doc_key}; output={args.output}; "
        f"keys={args.keys}"
    )

    gc = service_account()

    elections: dict[str, Election] = {}
    doc_overview = gc.open_by_key(args.doc_key)
    city_started = False
    for rec in doc_overview.worksheet("Sheet1").get_all_records():
        key = str(rec["key"])
        if key not in args.keys:
            logger.warning(f"Found key '{key}', not in {args.keys} => skipping")
            continue
        elections[key] = EXTRACT[key](gc, rec, args.wait, elections.get(key))

    # produce output file
    output_root = Path(args.output)
    output_root.mkdir(parents=True, exist_ok=True)

    generate(output_root, elections)
