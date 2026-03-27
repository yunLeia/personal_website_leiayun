#!/bin/bash

DEST="$(dirname "$0")/../public/Leia_Yun_Resume.pdf"

# If a path was passed as argument, use it
if [ -n "$1" ]; then
  SRC="$1"
else
  # Open native macOS file picker
  SRC=$(osascript -e 'POSIX path of (choose file of type "com.adobe.pdf" with prompt "Select your updated resume PDF")')
fi

if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
  echo "No file selected."
  exit 1
fi

cp "$SRC" "$DEST"
echo "Resume updated from: $SRC"
