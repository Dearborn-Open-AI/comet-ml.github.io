<a name="Table"></a>

## Table
**Kind**: global class  

* [Table](#Table)
    * [new Table(data, keys, headers, id, className)](#new_Table_new)
    * [.generate(headers, id, className)](#Table+generate)
    * [.appendTo(id)](#Table+appendTo)
    * [.title(text)](#Table+title) ⇒ <code>string</code>

<a name="new_Table_new"></a>

### new Table(data, keys, headers, id, className)
Creates an HTML table element from a list of dictionaries.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Array.&lt;Object&gt;</code> |  | list of JSON objects (can include HTML elements) |
| keys | <code>Array.&lt;string&gt;</code> |  | (optional) - array of titles to show, in order |
| headers | <code>Array.&lt;string&gt;</code> |  | (optional) - dictionary of header replacements |
| id | <code>string</code> | <code>&quot;data-table&quot;</code> | (optional) - id for HTML table element |
| className | <code>string</code> | <code>&quot;data-table&quot;</code> | (optional) - class for HTML table element |

**Example**  
```js
> table = Table([{"column_one": 1}], ["column_one"], {"column_one": "New Name"},
                "new-id", "new-class");
> table.appendTo("parent-id")
```
<a name="Table+generate"></a>

### table.generate(headers, id, className)
Generates an HTML table element and saves it in this.table

**Kind**: instance method of [<code>Table</code>](#Table)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| headers | <code>Array.&lt;string&gt;</code> |  | dictionary of header replacements |
| id | <code>string</code> | <code>&quot;data-table&quot;</code> | id for HTML table element |
| className | <code>string</code> | <code>&quot;data-table&quot;</code> | class for HTML table element |

<a name="Table+appendTo"></a>

### table.appendTo(id)
Appends the table onto the element with id.

**Kind**: instance method of [<code>Table</code>](#Table)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | id of parent container |

**Example**  
```js
> table = Table([{"column_one": 1}]);
> table.appendTo("parent-id")
```
<a name="Table+title"></a>

### table.title(text) ⇒ <code>string</code>
Utility funtion to give title case of headers

**Kind**: instance method of [<code>Table</code>](#Table)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | heading of column |

**Example**  
```js
> table = Table([{"column_one": 1}]);
> table.title("column one")
"Column One"
```
