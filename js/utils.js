// -*- mode: js; js-indent-level: 2; -*-

/**
 * Returns a span element with link to item.
 *
 * @param {string} text - the text for the URL
 * @param {string} url - the address for the URL
 *
 * @returns {Object} a span node with link as contents
 *
 * @example
 *
 * > makeLink("The Text", "https://company.com/")
 * <span><a href="https://company.com/">The Text</span>
 *
 */
function makeLink(text, url) {
  let span = document.createElement("span");
  span.innerHTML = text.link(url);
  return span;
}

/**
 * Returns a deepcopy of an object
 *
 * @param {Object} obj - an object to copy
 *
 * @returns {Object} a copy of the obj
 *
 * @example
 *
 * > copy({"key": "value"})
 * {"key": "value"}
 *
 */
function copy(obj) {
  if (!obj || true == obj)
    return obj;
  let objType = typeof obj;
  // Add additional immutables here:
  if ("number" == objType || "string" == objType)
    return obj;
  let result = Array.isArray(obj)
    ? []
    : !obj.constructor
    ? {}
    : new obj.constructor();
  if (obj instanceof Map)
    for (var key of obj.keys()) result.set(key, copy(obj.get(key)));
  for (var key in obj)
    if (obj.hasOwnProperty(key)) result[key] = copy(obj[key]);
  return result;
}

/**
 * A function that returns what it is given
 *
 * @param {Object} obj - an object or value
 *
 * @returns {Object} the object or value
 *
 * @example
 *
 * > identity(42)
 * 42
 *
 */
function identity(v) {
  return v;
}

/**
 * Creates a comparison function used in sorting
 *
 * @param {string} field - the name of an attribute of an object
 * @param {Object} reverse - if true, reverse the sort order
 * @param {function} func - a function to apply to the field before sorting
 *
 * @returns {function} the sorting comparison function
 *
 * @example
 *
 * > [
 *    {"field1": 23, ...},
 *    {"field1": 6, ...},
 *   ].sort(compare("field1"))
 *
 * [{"field1": 6, ...}, {"field1": 23, ...}]
 *
 */
function compare(field, reverse = false, func = identity) {
  return function(a, b) {
    let nameA = func(a[field]);
    let nameB = func(b[field]);
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      nameA = a[field].toUpperCase();
      nameB = b[field].toUpperCase();
    } else if (typeof a[field] !== typeof b[field]) {
      nameA = typeof a[field];
      nameB = typeof b[field];
    }
    let result = 0;
    if (nameA < nameB) {
      result = -1;
    } else if (nameA > nameB) {
      result = 1;
    }
    if (reverse) result = result * -1;
    return result;
  };
}

/**
 * Returns a string with first letter capitalized
 *
 * @param {string} text - the text to capitalize
 *
 * @returns {string} capitalized string
 *
 * @example
 *
 * > capitalized("some text");
 * "Some text"
 *
 */
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Returns a string with first letter of every word capitalized
 *
 * @param {string} text - the text of words to capitalize
 *
 * @returns {string} capitalized word string
 *
 * @example
 *
 * > capitalized("some text");
 * "Some Text"
 *
 */
function title(text) {
  return text.replace(/(^\w{1})|(\s{1}\w{1})/g,
                      match => match.toUpperCase());
}
