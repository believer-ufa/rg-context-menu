<rg-context-menu-item>

	<div class="item { inactive: opts.inactive }" onclick="{ selectItem }">
		<yield/>
	</div>

	<script>
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
	</script>

</rg-context-menu-item>
