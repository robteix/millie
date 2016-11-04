#!/bin/bash

DISTDIR="`pwd`/release"
VERSION=0.9.4
ELECTRON_VERSION=1.2.7



create_package() {
	os="$1"
	arch="$2"
	icon="$3"
	rm -rf "$DISTDIR/Millie-${os}-${arch}.zip"
	./node_modules/.bin/electron-packager . "Millie" --platform=$os --arch=$arch --icon=$icon --overwrite --prune --ignore=release --ignore=distro.sh --app-version="$VERSION" --app-copyright "Copyright (C) 2016 Roberto Selbach Teixeira" --asar --out="$DISTDIR" --version="$ELECTRON_VERSION"
	cd "$DISTDIR/Millie-${os}-${arch}"
	zip -9ryv "$DISTDIR/Millie-${os}-${arch}.zip" .
	cd -
}

# max
create_package darwin x64 ./app/img/app.icns
create_package linux ia32 ./app/img/app.ico
create_package linux x64 ./app/img/app.ico
create_package win32 ia32 ./app/img/app.ico
create_package win32 x64 ./app/img/app.ico
#grunt create-windows-installer:ia32
#mv "$DISTDIR/MillieSetup.exe" "$DISTDIR/Millie-win32-ia32.exe"
#grunt create-windows-installer:x64
#mv "$DISTDIR/MillieSetup.exe" "$DISTDIR/Millie-win32-x64.exe"
