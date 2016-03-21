#!/bin/sh 

if [ "x$1x" == "xx" ]; then
	echo "use mkicns.sh [filename]"
	exit 1
fi

ORIGINAL="$1"

cp "$ORIGINAL" icon_512x512@2x.png
convert "$ORIGINAL" -resize 512x512 icon_512x512.png
cp icon_512x512.png icon_256x256@2x.png
convert "$ORIGINAL" -resize 256x256 icon_256x256.png
cp icon_256x256.png icon_128x128@2x.png
convert "$ORIGINAL" -resize 128x128 icon_128x128.png
cp icon_128x128.png icon_64x64@2x.png
convert "$ORIGINAL" -resize 64x64 icon_64x64.png
cp icon_64x64.png icon_32x32@2x.png
convert "$ORIGINAL" -resize 32x32 icon_32x32.png
cp icon_32x32.png icon_16x16@2x.png
convert "$ORIGINAL" -resize 16x16 icon_16x16.png
