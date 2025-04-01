#!/bin/bash

set -e

icon_dir="${PWD}/AppIcon.iconset"
resource_a="${PWD}/AppleHole.app/Contents/Resources/AppIcon.icns"
resource_b="${PWD}/AppleHole.app/Contents/Library/LoginItems/Daemon.app/Contents/Resources/AppIcon.icns"

if [[ ! -d "$icon_dir" ]]; then
  mkdir "$icon_dir"
fi

rm -rf "${PWD}/assets/AppIcon.iconset"
rm -f $resource_a

mk_icons() {
  # Light
  base_image="${PWD}/images/applehole-Light-1024x1024.png"
  sips -z 1024 1024 "$base_image" --out ${icon_dir}/icon_512x512@2x.png
  sips -z 16 16 "$base_image" --out ${icon_dir}/icon_16x16.png
  sips -z 32 32 "$base_image" --out ${icon_dir}/icon_16x16@2x.png
  sips -z 32 32 "$base_image" --out ${icon_dir}/icon_32x32.png
  sips -z 64 64 "$base_image" --out ${icon_dir}/icon_32x32@2x.png
  sips -z 128 128 "$base_image" --out ${icon_dir}/icon_128x128.png
  sips -z 256 256 "$base_image" --out ${icon_dir}/icon_128x128@2x.png
  sips -z 256 256 "$base_image" --out ${icon_dir}/icon_256x256.png
  sips -z 512 512 "$base_image" --out ${icon_dir}/icon_256x256@2x.png
  sips -z 512 512 "$base_image" --out ${icon_dir}/icon_512x512.png
  # Dark
  base_dark_image="${PWD}/images/applehole-Dark-1024x1024.png"
  sips -z 1024 1024 "$base_dark_image" --out ${icon_dir}/icon_512x512@2x_dark.png
  sips -z 16 16 "$base_dark_image" --out ${icon_dir}/icon_16x16_dark.png
  sips -z 32 32 "$base_dark_image" --out ${icon_dir}/icon_16x16@2x_dark.png
  sips -z 32 32 "$base_dark_image" --out ${icon_dir}/icon_32x32_dark.png
  sips -z 64 64 "$base_dark_image" --out ${icon_dir}/icon_32x32@2x_dark.png
  sips -z 128 128 "$base_dark_image" --out ${icon_dir}/icon_128x128_dark.png
  sips -z 256 256 "$base_dark_image" --out ${icon_dir}/icon_128x128@2x_dark.png
  sips -z 256 256 "$base_dark_image" --out ${icon_dir}/icon_256x256_dark.png
  sips -z 512 512 "$base_dark_image" --out ${icon_dir}/icon_256x256@2x_dark.png
  sips -z 512 512 "$base_dark_image" --out ${icon_dir}/icon_512x512_dark.png
}

mk_icons

iconutil -c icns "$icon_dir" --out "${PWD}/assets/AppIcon.icns"
mv "${icon_dir}" "${PWD}/assets/"
cp "${PWD}/assets/AppIcon.icns" $resource_a
