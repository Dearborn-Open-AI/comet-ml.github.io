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
> api.makeLink("The Text", "https://company.com/")
<span><a href="https://company.com/">The Text</span>
```
