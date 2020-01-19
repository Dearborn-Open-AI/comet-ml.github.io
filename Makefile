FILES = $(wildcard js/*.js)
FILES += $(wildcard css/*.css)

MINIFY = $(FILES:%=min/%)

all: $(MINIFY)

clean:
	$(RM) -rf min
	mkdir -p min/js
	mkdir -p min/css

min/%: %
	minify $< -o $@
