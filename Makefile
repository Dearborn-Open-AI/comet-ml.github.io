JAVASCRIPTS = $(wildcard js/*.js)
STYLESHEETS = $(wildcard css/*.css)

FILES = $(JAVASCRIPTS)
FILES += $(STYLESHEETS)

MINIFY = $(FILES:%=min/%)
DOCS = $(JAVASCRIPTS:js/%.js=docs/%.md)

all: $(MINIFY) $(DOCS)

init:
	mkdir -p min/css
	mkdir -p min/js

clean:
	$(RM) -r $(MINIFY)
	$(RM) -f $(DOCS)

min/%: %
	minify $< -o $@

docs/%.md: js/%.js
	jsdoc2md $< > $@
