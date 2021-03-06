# Millie

Millie is a multiplatform, multiservice instant messaging client made with love.

![](./millie.png)

## Install from Binaries

Binary releases are [available here](https://github.com/robteix/millie/releases) for Windows, OSX, and Linux.

## Install from Sources

First, clone the repository: 

```bash
git clone https://github.com/robteix/millie.git millie
```

And then install dependencies.

```bash
$ cd millie && npm install
```

## Run

Run this to start Millie.

```bash
npm start
```

*Note: requires a node version >= 4 and an npm version >= 2.*

## Package

You can generate a package for your OS by running this.

```bash
npm run package
```

The package will be in the `release` directory. You can move it to
`/Applications` on OSX. For Windows and Linux, just copy it somewhere
and create a shortcut on your desktop.

## License

Copyright © 2016 [Roberto Selbach Teixeira](https://www.robteix.com).
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
this list of conditions and the following disclaimer in the documentation
and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors
may be used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
POSSIBILITY OF SUCH DAMAGE.
