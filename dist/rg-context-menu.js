riot.tag('rg-context-menu-item', '<div class="item { inactive: opts.inactive }" onclick="{ selectItem }"> <yield></yield> </div>', function(opts) {
		var _this = this;

		_this.selectItem = function () {
			if (!opts.inactive) {
				if (opts.onselect) {
					opts.onselect(opts);
				}
				_this.parent.opts.menu.opened = false;
				_this.parent.update();
			}
		};
	
});

riot.tag('rg-context-menu-raw', '<span></span>', function(opts) {
		var _this = this;
		_this.on('mount', function () {
			this.root.innerHTML = opts.content;
		});
	
});
riot.tag('rg-context-menu', '<div class="dropdown" show="{ opts.menu.opened }"> <div class="list"> <div each="{ opts.menu.items }" class="item { inactive: inactive }" onclick="{ selectItem }"> <rg-context-menu-raw if="{ content && !text }" content="{ content }"></rg-context-menu-raw> <span if="{ text }">{ text }</span> </div> <yield></yield> </div> </div>', 'rg-context-menu .dropdown, [riot-tag="rg-context-menu"] .dropdown{ position: absolute; background-color: white; border: 1px solid #D3D3D3; border-top: 0; text-align: left; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; -webkit-box-shadow: 0 2px 10px -4px #444; -moz-box-shadow: 0 2px 10px -4px #444; box-shadow: 0 2px 10px -4px #444; } rg-context-menu .item, [riot-tag="rg-context-menu"] .item{ cursor: pointer; padding: 10px; border-top: 1px solid #E8E8E8; background-color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } rg-context-menu .item:hover, [riot-tag="rg-context-menu"] .item:hover{ background-color: #f3f3f3; } rg-context-menu .item.inactive, [riot-tag="rg-context-menu"] .item.inactive{ color: #8a8a8a; font-style: italic; } rg-context-menu .item.inactive:hover, [riot-tag="rg-context-menu"] .item.inactive:hover{ background-color: #fff; }', function(opts) {

		var _this = this;
		opts.menu = opts.menu || {};

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
			if (opts.menu.onopen) {
				opts.menu.onopen(e);
			}
			opts.menu.opened = true;


			_this.update();

			var x = e.pageX;
			var y = e.pageY;
			var dd = _this.root.querySelector('.dropdown');
			var ddRect = dd.getBoundingClientRect();

			if (x > window.innerWidth - ddRect.width) { // Its too close to the edge!
				x = window.innerWidth - ddRect.width;
			}
			dd.style.left = x + 'px';

			if (y > window.innerHeight - ddRect.height) { // Its too close to the edge!
				y = window.innerHeight - ddRect.height;
			}
			dd.style.top = y + 'px';

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
			if (!e.item.inactive) {
				if (e.item.onselect) {
					e.item.onselect(e.item);
				}
				opts.menu.opened = false;
			}
		};

	
});
