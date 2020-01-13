class Table {
  constructor(data, keys, headers) {
    this.data = data;
    this.headers = headers;
    if (typeof keys === "undefined") {
      this.keys = Object.keys(this.data[0]);
    } else {
      this.keys = keys;
    }
    this.table = window.document.createElement("table");
    this.table.id = "data-table";
    this.generate();
  }

  generate() {
    // add all of the data:
    for (let i = 0; i < this.data.length; i++) {
      let element = this.data[i];
      let row = this.table.insertRow();
      for (let j = 0; j < this.keys.length; j++) {
        let key = this.keys[j];
        let cell = row.insertCell();
        let text = element[key];
        if (typeof text !== "string") text = JSON.stringify(text);
        let node = window.document.createTextNode(text);
        cell.appendChild(node);
      }
    }
    // add the headers:
    let thead = this.table.createTHead();
    let row = thead.insertRow();
    for (let key of this.keys) {
      let th = window.document.createElement("th");
      if (typeof this.headers !== "undefined" && key in this.headers)
        key = this.headers[key];
      key = this.title(key);
      key = key.replace(/_/g, " ");
      let text = window.document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  appendTo(id) {
    const div = window.document.getElementById(id);
    div.appendChild(this.table);
  }

  title(string) {
    return string.replace(/(^\w{1})|(\s{1}\w{1})/g,
                          match => match.toUpperCase());
  }
}
