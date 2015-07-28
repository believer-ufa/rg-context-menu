<img src="https://raw.githubusercontent.com/RiotGear/rg-context-menu/master/demo/img/example.png" width="500px" />

### Use

Add this to your Riot app markup

```html
<rg-context-menu id="myMenu" menu="{ menu }"></rg-context-menu>
```

Then assign the context menu to the elements you would like to by using `rg-context-menu`

```html
<div rg-context-menu="myMenu">
	lorem ipsum etc.
</div>
```

To populate the menu pass these options

```javascript
this.menu = {
  onopen: function (e) {
    console.log('Menu opened');
    console.log(e);
  },
  onclose: function (e) {
    console.log('Menu closed');
    console.log(e);
  },
  items: [{
		content: '<strong>View source</strong>',
		onselect: function (e) { ... }
	}, {
		text: 'Save as...',
		inactive: true,
		onselect: function (e) { ... }
	}, {
		text: 'Reload',
		onselect: function (e) { ... }
	}]
}
```

Or you can use the `rg-context-menu-item` child tag

```html
<rg-context-menu-item onselect="{ parent.itemSelected }" inactive="false">
  <strong>View source</strong>
</rg-context-menu-item>
```

- `onopen` will fire when the menu appears
- `onclose` fires when the menu is dismissed
- `items` is the array of items to display in the popup list
- `items.content` is the HTML content of the item
- `items.text` is the plain text content of the item, if specified the tag will ignore `content` and use `text`
- `items.inactive` set a inactive class and prevents events
- `items.onselect` fires when an item is clicked on. The menu will also automatically close on select