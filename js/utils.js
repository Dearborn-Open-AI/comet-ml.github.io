// -*- mode: js; js-indent-level: 2; -*-

class Histogram {
  /**
   * Create a histogram. Data is stored in exponentially
   * distributed buckets.
   * @param {JSON} hist - A histogram in JSON format
   */
   constructor(hist) {
    // Create from the hist JSON
    this.step = hist.step;
    this.values = this.createValues(
      hist.histogram.start,
      hist.histogram.stop,
      hist.histogram.step,
      hist.histogram.offset
    );
    // Create the counts
    this.counts = Array.from({ length: this.values.length }).fill(0);
    for (let index_count of hist.histogram.index_values) {
      this.counts[index_count[0]] = index_count[1];
    }
  }

  /**
   * Create the values for each bucket.
   * @param {number} start - the starting range
   * @param {number} stop - the stoping range
   * @param {number} step - the step to increment, in percent
   * @param {number} offset - the offset, usually zero
   */
  createValues(start, stop, step, offset) {
    let values = [-Infinity, offset, Infinity];
    let value = start;
    while (value <= stop) {
      values.splice(1, 0, offset - value);
      values.splice(values.length - 1, 0, offset + value);
      value *= step;
    }
    return values;
  }

  /**
   * Get the bucket index.
   * @param {number} value - get the bucket index of value
   */
  getBinIndex(value) {
    if (value == Infinity) {
      return this.values.length - 1;
    } else {
      return this.binarySearch(value, 0, this.values.length - 1);
    }
  }

  /**
   * Find the value's bucket using binary search.
   * @param {number} value - the value to lookup
   * @param {number} low - the lowest value
   * @param {number} high - the highest value
   */
  binarySearch(value, low, high) {
    while (true) {
      let middle = Math.floor((high + low) / 2);
      if (high - low <= 1) {
        return low;
      } else if (value < this.values[middle]) {
        high = middle;
      } else {
        low = middle;
      }
    }
  }

  /**
   * Compute the counts for each span.
   * @param {number} min_value - the starting value
   * @param {number} max_value - the stoping value
   * @param {number} span_value - the step to increment, in value
   */
  getCounts(min_value, max_value, span_value) {
    const results = [];
    let bucketPos = 0;
    let binLeft = min_value;
    while (binLeft < max_value) {
      let binRight = binLeft + span_value;
      let count = 0.0;
      // Don't include last as bucketLeft, which is infinity:
      while (bucketPos < this.values.length - 1) {
        let bucketLeft = this.values[bucketPos];
        let bucketRight = Math.min(max_value, this.values[bucketPos + 1]);
        let intersect =
          Math.min(bucketRight, binRight) - Math.max(bucketLeft, binLeft);

        if (intersect > 0) {
          if (bucketLeft == Infinity) {
            count += this.counts[bucketPos];
          } else {
            count +=
              (intersect / (bucketRight - bucketLeft)) * this.counts[bucketPos];
          }
        }
        if (bucketRight > binRight) {
          break;
        }
        bucketPos += 1;
      }
      results.push(count);
      binLeft += span_value;
    }
    return results;
  }
}

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

/**
 * Formats a Date object as a string.
 *
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 *
 * @param {Date} date instance
 * @param {string} mask
 * @param {string} utc
 *
 * @returns {string} the data as a string format
 *
 * @example
 *
 * > new Date().format("HH:MM:ss")
 * "23:30:56"
 */
function format(date, mask, utc) {
  return dateFormat(date, mask, utc);
}


var dateFormat = (function() {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function(val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

  return function(date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (
      arguments.length == 1 &&
      Object.prototype.toString.call(date) == "[object String]" &&
      !/\d/.test(date)
    ) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date();
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d: d,
        dd: pad(d),
        ddd: dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m: m + 1,
        mm: pad(m + 1),
        mmm: dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy: String(y).slice(2),
        yyyy: y,
        h: H % 12 || 12,
        hh: pad(H % 12 || 12),
        H: H,
        HH: pad(H),
        M: M,
        MM: pad(M),
        s: s,
        ss: pad(s),
        l: pad(L, 3),
        L: pad(L > 99 ? Math.round(L / 10) : L),
        t: H < 12 ? "a" : "p",
        tt: H < 12 ? "am" : "pm",
        T: H < 12 ? "A" : "P",
        TT: H < 12 ? "AM" : "PM",
        Z: utc
          ? "UTC"
          : (String(date).match(timezone) || [""])
              .pop()
              .replace(timezoneClip, ""),
        o:
          (o > 0 ? "-" : "+") +
          pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4),
        S: ["th", "st", "nd", "rd"][
          d % 10 > 3 ? 0 : (((d % 100) - (d % 10) != 10) * d) % 10
        ]
      };

    return mask.replace(token, function($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
})();

// Some common format strings
dateFormat.masks = {
  default: "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
  return dateFormat(this, mask, utc);
};
