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
		text: 'View source',
		onselect: itemSelected
	}, {
		text: 'Save as...',
		disabled: true,
		onselect: itemSelected
	}, {
		text: 'Reload',
		onselect: itemSelected
	}]
}
```

- `onopen` will fire when the menu appears
- `onclose` fires when the menu is dismissed
- `items` is the array of items to display in the popup list
- `items.text` is the text of the item
- `items.disabled` set a disabled class and prevents events
- `items.onselect` fires when an item is clicked on. The menu will also automatically close on select