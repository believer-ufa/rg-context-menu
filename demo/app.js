riot.tag('demo-app', '<div class="clickable-area" rg-context-menu="myMenu"></div> <rg-context-menu id="myMenu" menu="{ menu }"> <rg-context-menu-item onselect="{ parent.itemSelected }"> Custom <strong>text</strong> </rg-context-menu-item> </rg-context-menu>', '.clickable-area { position: absolute; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); }', function(opts) {

		var _this = this;

		_this.menu = {
			onopen: function (e) {
				console.log('Menu opened');
				console.log(e);
			},
			onclose: function (e) {
				console.log('Menu closed');
				console.log(e);
			},
			onselect: itemSelected,
			items: [{
				content: '<strong>View source</strong>',
				onselect: itemSelected
			}, {
				text: 'Save as...',
				inactive: true,
				onselect: itemSelected
			}, {
				text: 'Reload',
				onselect: itemSelected
			}]
		};

		function itemSelected(e) {
			console.log('Item selected');
			console.log(e);
			_this.update();
		}

		_this.itemSelected = itemSelected;

	
});