#!/bin/sh

set -e

if [ $# -ne 1 ]; then
  echo "Usage: scripts/build/build-ckeditor.sh CKEDITOR_VERSION"
  exit 1
fi

VERSION=$1

# Make sure submodule is registered and up-to-date.
git submodule update --init

# Fetch remote changes.
cd lib/ckeditor-dev
git fetch

# Make sure our working copy is clean.
git reset --hard HEAD
git clean -fd

# Checkout desired target version.
git checkout "$VERSION"

# Grab the build config.
cp ../ckeditor-build-config.js dev/builder/build-config.js

# Make the release build.
dev/builder/build.sh --skip-omitted-in-build-config

# Remove old build files.
rm -r ../ckeditor/*

# Replace with new build files.
cp -r dev/builder/release/ckeditor/* ../ckeditor/

# Make the debug build.
dev/builder/build.sh \
  --skip-omitted-in-build-config \
  --leave-css-unminified \
  --leave-js-unminified

# Remove old build files.
rm -r ../ckeditor-debug/*

# Replace with new build files.
cp -r dev/builder/release/ckeditor/* ../ckeditor-debug/

echo
echo "*---------------------------------------------------------*"
echo "|                          DONE                           |"
echo "*---------------------------------------------------------*"
echo
echo "You should now check that everything is still working with"
echo "the new build. ie:"
echo
echo "    yarn build && yarn test"
echo "    yarn start # check demo"
echo
echo "Don't forget to commit the result!"
echo
echo "    git add -A -- lib"
echo "    git commit -m 'chore: Update CKEDITOR to $VERSION'"
echo
