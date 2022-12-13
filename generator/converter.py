#!/usr/bin/env python3

import argparse
from pathlib import Path
import time

import gspread

from generator.generate import generate
from generator.komunalni_2022 import extract_election_komunalni
from generator.komunalni_2022 import update_election_komunalni
from generator.senat_2022 import extract_election_senat
from generator.types import Election

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

    # TODO: there should be some sheet or additional parameters
    # describing voting districts

    args = parser.parse_args()

    gc = gspread.service_account()

    elections: dict[str, Election] = {}
    doc_overview = gc.open_by_key(args.doc_key)
    city_started = False
    for rec in doc_overview.worksheet("Sheet1").get_all_records():
        name = str(rec["name"])
        if name == "Senát":
            elections["senatni-2022"] = extract_election_senat(gc, rec, wait=args.wait)
        elif name == "Města":
            elections["komunalni-2022"] = extract_election_komunalni(
                gc, rec, wait=args.wait
            )
            city_started = True
        elif city_started and name:
            election = elections["komunalni-2022"]
            update_election_komunalni(gc, rec, name, election)
            time.sleep(args.wait)

    # produce output file
    output_root = Path(args.output)
    output_root.mkdir(parents=True, exist_ok=True)

    generate(output_root, elections)
