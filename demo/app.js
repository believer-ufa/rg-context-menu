riot.tag('demo-app', '<div class="clickable-area" rg-context-menu="myMenu"> Section 1 </div> <div class="clickable-area" rg-context-menu="mySecondMenu"> Section 2 </div> <rg-context-menu id="myMenu"> <rg-context-menu-item onselect="{ parent.itemSelected }"> Custom <strong>text</strong> </rg-context-menu-item> </rg-context-menu> <rg-context-menu id="mySecondMenu" menu="{ secondMenu }"></rg-context-menu>', '.clickable-area { display: inline-block; width: 200px; height: 200px; margin: 1em; background-color: rgba(0, 0, 0, 0.5); }', function(opts) {

		var _this = this;

		_this.menu = {
			items: [{
				text: 'Menu one',
				onselect: itemSelected
			}]
		};

		_this.secondMenu = {
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