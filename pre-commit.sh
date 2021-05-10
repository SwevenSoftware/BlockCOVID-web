#!/bin/bash
if !(npm run formatApply) >/dev/null 2>&1
then
    echo "Foramtting error, please run 'npm run formatApply'" 1>&2
    exit 1
fi
