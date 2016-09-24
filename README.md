# build-wt

[![apm](https://img.shields.io/apm/l/build-wt.svg?style=flat-square)](https://atom.io/packages/build-wt)
[![apm](https://img.shields.io/apm/v/build-wt.svg?style=flat-square)](https://atom.io/packages/build-wt)
[![apm](https://img.shields.io/apm/dm/build-wt.svg?style=flat-square)](https://atom.io/packages/build-wt)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-wt.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-wt)
[![David](https://img.shields.io/david/idleberg/atom-build-wt.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-wt#info=dependencies)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-wt.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-wt?type=dev)

[Atom Build](https://atombuild.github.io/) provider for [Wellington](https://github.com/wellington/wellington), compiles Sass/SCSS into CSS. Supports the [linter](https://atom.io/packages/linter) package for error highlighting.

## Installation

### apm

Install `build-wt` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-wt`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Linux & macOS
$ cd ~/.atom/packages/
```

Clone repository as `build-wt`:

```bash
$ git clone https://github.com/idleberg/atom-build-wt build-wt
```

Install Node dependencies:

```bash
cd build-wt
npm install
```

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `Wellington [compact|compressed|expanded]`
* `Watch Wellington [compact|compressed|expanded]`

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-wt) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
