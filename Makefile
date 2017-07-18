usage:
	@echo - build ......... builds the html table from the json.
	@echo - clean ......... removes the built artifacts.

prepublish: clean build

clean:
	@rm -rf dist/output.html lib docs

build:
	@node src

.PHONY: usage clean build
