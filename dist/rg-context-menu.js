riot.tag('rg-context-menu', '<div class="dropdown" if="{ opts.menu.opened }" riot-style="{ style }"> <div class="list"> <div each="{ opts.menu.items }" class="item { disabled: disabled }" onclick="{ selectItem }"> { text } </div> </div> </div>', 'rg-context-menu .dropdown, [riot-tag="rg-context-menu"] .dropdown{ position: absolute; background-color: white; border: 1px solid #D3D3D3; border-top: 0; text-align: left; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-box-shadow: 0 2px 10px -4px #444; -moz-box-shadow: 0 2px 10px -4px #444; box-shadow: 0 2px 10px -4px #444; } rg-context-menu .item, [riot-tag="rg-context-menu"] .item{ cursor: pointer; padding: 10px; border-top: 1px solid #E8E8E8; background-color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-context-menu .item:hover, [riot-tag="rg-context-menu"] .item:hover{ background-color: #f3f3f3; } rg-context-menu .item.disabled, [riot-tag="rg-context-menu"] .item.disabled{ color: #8a8a8a; font-style: italic; } rg-context-menu .item.disabled:hover, [riot-tag="rg-context-menu"] .item.disabled:hover{ background-color: #fff; }', function(opts) {

		var _this = this;

		function handleClickOutside(e) {
			if (!_this.root.contains(e.target)) {
				if (opts.menu.onclose && opts.menu.opened) {
					opts.menu.onclose(e);
				}
				opts.menu.opened = false;
				_this.update();
			}
		}

		function openMenu(e) {
			e.preventDefault();
			_this.style = 'left: ' + e.clientX + 'px; top: ' + e.clientY + 'px;';
			if (opts.menu.onopen) {
				opts.menu.onopen(e);
			}
			opts.menu.opened = true;
			_this.update();
		}

		_this.on('mount', function () {
			document.addEventListener('click', handleClickOutside);
			var targets = document.querySelectorAll('[rg-context-menu]');
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == opts.id) {
					target.addEventListener('contextmenu', openMenu);
				} else {
					target.addEventListener('contextmenu', _this.closeMenu);
				}
			}
		});

		_this.on('unmount', function () {
			document.removeEventListener('click', handleClickOutside);
			var targets = document.querySelectorAll('[rg-context-menu]');
			for (var i = 0, target; target = targets[i]; i++) {
				if (target.attributes['rg-context-menu'].value == opts.id) {
					target.removeEventListener('contextmenu', openMenu);
				} else {
					target.removeEventListener('contextmenu', _this.closeMenu);
				}
			}
		});

		_this.closeMenu = function () {
			opts.menu.opened = false;
			_this.update();
		};

		_this.selectItem = function (e) {
			if (!e.item.disabled) {
				if (e.item.onselect) {
					e.item.onselect(e.item);
				}
				opts.menu.opened = false;
			}
		};

	
});