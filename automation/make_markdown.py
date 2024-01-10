#!/usr/bin/env python3

import os

_LOC = '../docs'
OUTPUT_MD = '../README.md'

def make_readme():
    """
    Compiles markdown files into single README.md.
    """
    with open(OUTPUT_MD, 'w') as output_file:
        for file_name in sorted(os.listdir(_LOC)):
            with open(os.path.join(_LOC, file_name)) as input_file:
                output_file.write(input_file.read())

make_readme()