#!/bin/bash
#
# Creates .png file from drawio

echo -e "[info] Making database-diagram.png ..."
/snap/bin/drawio -x -f png -o   ./your_file_name.png  ./your_file_name.drawio
echo -e "\n[info] Done!"