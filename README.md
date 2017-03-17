# Css to Stylus converter

### CLI usage:
```sh
Usage: css-to-stylus [options] <file ...>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -u --unprefix          remove vendor prefixes
    -i --indent [n]        set indentation (number|tab)
    -c --css-syntax        keep css syntax
    -l --keep-colons       keep colons
    -s --separate-rules    add new line before next rule
    -r --remove-comments   remove comments
    -d --output-dir [dir]  output dir
    -o --color-variables   create color variables at top of file

  Examples:

    # Generate file.styl in current folder from style.css
    cat style.css | css-to-stylus [options] >> file.styl

    # Generate random name file in dir folder
    cat style.css | css-to-stylus -d dir

    # Generate file1.styl & file2.styl in current folder
    css-to-stylus [options] file1.css file2.css
```