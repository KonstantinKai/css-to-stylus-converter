[![Build Status](https://travis-ci.org/KonstantinKai/css-to-stylus-converter.svg?branch=master)](https://travis-ci.org/KonstantinKai/css-to-stylus-converter)
[![npm version](https://badge.fury.io/js/css-to-stylus-converter.svg)](https://badge.fury.io/js/css-to-stylus-converter)
[![Dependency Status](https://www.versioneye.com/user/projects/594233096725bd00626ef96f/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/594233096725bd00626ef96f)

![Css To Stylus](https://konstantinkai.gallerycdn.vsassets.io/extensions/konstantinkai/vscode-css-to-stylus/0.0.1/1497339827241/Microsoft.VisualStudio.Services.Icons.Default)

# Css to Stylus converter

[=> Try VSCODE extension here <=](https://marketplace.visualstudio.com/items?itemName=konstantinkai.vscode-css-to-stylus)

### Install:

```sh
npm install -g css-to-stylus-converter
```

### Node usage:
```js
const cssToStylus = require('css-to-stylus-converter');

/**
 unprefix: boolean,
 indent: number,
 keepColons: boolean,
 cssSyntax: boolean,
 separateRules: boolean,
 removeComments: boolean,
 colorVariables: boolean,
 colorPrefix: string
 */

const stylusResult = cssToStylus(cssContent, converterOptions);
```

### CLI usage:
```sh
Usage: css-to-stylus [options] <file ...>

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -u, --unprefix               remove vendor prefixes
    -i, --indent [n]             set indentation (number|tab)
    -c, --css-syntax             keep css syntax
    -l, --keep-colons            keep colons
    -s, --separate-rules         add new line before next rule
    -r, --remove-comments        remove comments
    -o, --color-variables        create color variables at top of file
    -p, --color-prefix [prefix]  color variables prefix
    -d, --output-dir [dir]       output dir
    -v, --verbose                show information

  Examples:

    # Generate file1.styl & file2.styl in current folder
    css-to-stylus [options] file1.css file2.css

    # Generate file.styl in current folder from style.css
    cat style.css | css-to-stylus [options] >> file.styl

    # Generate random name file in dir folder
    cat style.css | css-to-stylus -d dir
```