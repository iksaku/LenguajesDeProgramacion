# Notes

- Remember to checkout the [Mercury Documentantion](http://mercurylang.org/documentation/documentation.html) and this great [Mercury Tutorial](http://mercurylang.org/documentation/papers/book.pdf).cpanm
- Mercury file extension is `.m`.
- To compile mercury, use the command `mmc --make <file>`, where `<file>` is the name of the Mercury file without extension. In example: `mmc --make hello`.
- When importing Mercury Modules, an underscore is in the name: `import_module io`. Most of my compilation errors where due to this.