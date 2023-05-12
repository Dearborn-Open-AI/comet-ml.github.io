// -*- mode: js; js-indent-level: 2; -*-

class Table {
  /**
   * Creates an HTML table element from a list of dictionaries.
   *
   * @param {Array<Object>} data - list of JSON objects (can include HTML elements)
   * @param {Array<string>} keys (optional) - array of titles to show, in order
   * @param {Array<string>} headers (optional) - dictionary of header replacements
   * @param {string} id (optional) - id for HTML table element
   * @param {string} className (optional) - class for HTML table element
   *
   * @example
   *
   * > table = Table([{"column_one": 1}], ["column_one"], {"column_one": "New Name"},
   *                 "new-id", "new-class");
   * > table.appendTo("parent-id")
   */
  constructor(
    data,
    keys,
    headers,
    id = "data-table",
    className = "data-table"
  ) {
    this.data = data;
    if (typeof keys === "undefined") {
      this.keys = Object.keys(this.data[0]);
    } else {
      this.keys = keys;
    }
    this.generate(headers, id, className);
  }

  /**
   * Generates an HTML table element and saves it in this.table
   *
   * @param {Array<string>} headers - dictionary of header replacements
   * @param {string} id - id for HTML table element
   * @param {string} className - class for HTML table element
   *
   */
  generate(headers, id = "data-table", className = "data-table") {
    this.table = window.document.createElement("table");
    this.table.id = id;
    this.table.className = className;
    // add all of the data:
    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      let row = this.table.insertRow();
      for (let j = 0; j < this.keys.length; j++) {
        let key = this.keys[j];
        let cell = row.insertCell();
        let text = element[key];
        let node = null;

        if (text && text.nodeType === 1) { // element
          node = text;
        } else if (typeof text === "object") {
          node = window.document.createTextNode(JSON.stringify(text));
        } else {
          node = window.document.createTextNode(text);
        }

        //node = window.document.createTextNode(typeof node);
        cell.appendChild(node);
      }
    }
    // add the headers:
    let thead = this.table.createTHead();
    let row = thead.insertRow();
    for (let key of this.keys) {
      let th = window.document.createElement("th");
      if (typeof headers !== "undefined" && key in headers)
        key = headers[key];
      key = this.title(key);
      key = key.replace(/_/g, " ");
      let text = window.document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  /**
   * Appends the table onto the element with id.
   *
   * @param {string} id - id of parent container
   *
   * @example
   *
   * > table = Table([{"column_one": 1}]);
   * > table.appendTo("parent-id")
   */
  appendTo(id) {
    const div = window.document.getElementById(id);
    div.appendChild(this.table);
  }

  /**
   * Utility funtion to give title case of headers
   *
   * @param {string} text - heading of column
   *
   * @returns {string}
   *
   * @example
   *
   * > table = Table([{"column_one": 1}]);
   * > table.title("column one")
   * "Column One"
   */
  title(text) {
    return text.replace(/(^\w{1})|(\s{1}\w{1})/g, match =>
      match.toUpperCase()
    );
  }
}
