# Generator

## Setup

1. Install [Poetry](https://python-poetry.org/docs/master/#installing-with-the-official-installer) - `make poetry-install`
2. Install dependencies - `make dep-install`

## How To Use It

There are two main scripts:

- `converter.py` - reads Google sheets and generates JSONs with extracted information
- `enrich_with_pdv.py` - reads generated JSON files and downloads and adjusts paths to images.

## How To Run It

- Run everything - `make poetry-run-converter` and `make poetry-run-enrich-with-pdv`
