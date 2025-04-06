
# Set the location of the source to build the dmg
DMG_BUILD_PATH="${PWD}/AppleHole.app/Contents" 
# Set the path to generate the dmg file to distribute.
ASSET_PATH="${PWD}/assets"

# Clear out all generated assets
rm -rf "${ASSET_PATH}/"*
rm -rf "${DMG_BUILD_PATH}/Resources/"*
rm -rf "${DMG_BUILD_PATH}/MacOs/"*

echo "Cleanup complete!"