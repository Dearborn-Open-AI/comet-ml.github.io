## Functions

<dl>
<dt><a href="#makeLink">makeLink(text, url)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a span element with link to item.</p>
</dd>
<dt><a href="#copy">copy(obj)</a> ⇒ <code>Object</code></dt>
<dd><p>Returns a deepcopy of an object</p>
</dd>
<dt><a href="#identity">identity(obj)</a> ⇒ <code>Object</code></dt>
<dd><p>A function that returns what it is given</p>
</dd>
<dt><a href="#compare">compare(field, reverse, func)</a> ⇒ <code>function</code></dt>
<dd><p>Creates a comparison function used in sorting</p>
</dd>
<dt><a href="#capitalize">capitalize(text)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a string with first letter capitalized</p>
</dd>
<dt><a href="#title">title(text)</a> ⇒ <code>string</code></dt>
<dd><p>Returns a string with first letter of every word capitalized</p>
</dd>
</dl>

<a name="makeLink"></a>

## makeLink(text, url) ⇒ <code>Object</code>
Returns a span element with link to item.

**Kind**: global function  
**Returns**: <code>Object</code> - a span node with link as contents  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text for the URL |
| url | <code>string</code> | the address for the URL |

**Example**  
```js
> makeLink("The Text", "https://company.com/")
<span><a href="https://company.com/">The Text</span>
```
<a name="copy"></a>

## copy(obj) ⇒ <code>Object</code>
Returns a deepcopy of an object

**Kind**: global function  
**Returns**: <code>Object</code> - a copy of the obj  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object to copy |

**Example**  
```js
> copy({"key": "value"})
{"key": "value"}
```
<a name="identity"></a>

## identity(obj) ⇒ <code>Object</code>
A function that returns what it is given

**Kind**: global function  
**Returns**: <code>Object</code> - the object or value  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | an object or value |

**Example**  
```js
> identity(42)
42
```
<a name="compare"></a>

## compare(field, reverse, func) ⇒ <code>function</code>
Creates a comparison function used in sorting

**Kind**: global function  
**Returns**: <code>function</code> - the sorting comparison function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| field | <code>string</code> |  | the name of an attribute of an object |
| reverse | <code>Object</code> | <code>false</code> | if true, reverse the sort order |
| func | <code>function</code> |  | a function to apply to the field before sorting |

**Example**  
```js
> [
   {"field1": 23, ...},
   {"field1": 6, ...},
  ].sort(compare("field1"))

[{"field1": 6, ...}, {"field1": 23, ...}]
```
<a name="capitalize"></a>

## capitalize(text) ⇒ <code>string</code>
Returns a string with first letter capitalized

**Kind**: global function  
**Returns**: <code>string</code> - capitalized string  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text to capitalize |

**Example**  
```js
> capitalized("some text");
"Some text"
```
<a name="title"></a>

## title(text) ⇒ <code>string</code>
Returns a string with first letter of every word capitalized

**Kind**: global function  
**Returns**: <code>string</code> - capitalized word string  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | the text of words to capitalize |

**Example**  
```js
> capitalized("some text");
"Some Text"
```
