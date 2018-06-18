<template>
<pre>
<code :key="'grids' + index" v-for="(grid, index) in gridStyles">
{{grid.class}} {
{{grid.styles}}
}</code>
<code v-for="(item, index) in itemStyles" :key="'items' + index">
{{item.class}} {
{{item.styles}}}
</code>
</pre>
</template>

<script>
export default {
	name: 'cssCode',
	computed: {
		gridStyles: function() {
			let store = this.$store;
			let grids = store.state.grid.gridsList;
			let gridStyles = [];
			grids.forEach(function(grid) {
				if (grid === 'none') return null;
				gridStyles.push({
					class: '.' + grid,
					styles: ''
				});
				
				let styles = gridStyles[gridStyles.length - 1].styles;

				styles += '\talign-content' + ': ' + store.state.grid[grid].alignContent + ';\n';
				styles += '\talign-items' + ': ' + store.state.grid[grid].alignItems + ';\n';
				styles += '\tgap' + ': ' + store.state.grid[grid].rowsGap + ' ' + store.state.grid[grid].columnsGap + ';\n';
				styles += '\tgrid-auto-flow' + ': ' + store.state.grid[grid].gridAutoFlow + ';\n';
				styles += '\theight' + ': ' + store.state.grid[grid].height + ';\n';
				styles += '\twidth' + ': ' + store.state.grid[grid].width + ';\n';
				styles += '\tjustify-content' + ': ' + store.state.grid[grid].justifyContent + ';\n';
				styles += '\tjustify-items' + ': ' + store.state.grid[grid].justifyItems + ';\n';
				styles += '\tgrid-template-columns' + ': ' + store.state.grid[grid].templateColumns.join(' ') + ';\n';
				styles += '\tgrid-template-rows' + ': ' + store.state.grid[grid].templateRows.join(' ') + ';\n';
			
				gridStyles[gridStyles.length - 1].styles = styles;
			})
			return gridStyles;
		},
		itemStyles: function() {
			let store = this.$store;
			let grids = store.state.grid.gridsList;
			let itemStyles = [];
			let gridStyles = this.gridStyles;
			grids.forEach(function(grid) {
				if (grid === 'none') return null;
				let items = store.state.grid[grid].items;
				items.forEach(function(item, index) {

					itemStyles.push({
						class: '.' + grid + ' > div:nth-of-type(' + (index + 1) + ')',
						styles: ''
					});

					let styles = itemStyles[itemStyles.length - 1].styles;

					let gridArea = item.fromRow + ' / ' + item.fromCol + ' / ' + item.toRow + ' / ' + item.toCol;
					let placeSelf = item.alignSelf + ' ' + item.justifySelf;

					if (gridArea !== 'auto / auto / auto / auto') styles += '\tgrid-area' + ': ' + gridArea + ';\n';
					if (placeSelf !== 'auto auto' && placeSelf !== 'stretch stretch' && placeSelf !== 'auto stretch' && placeSelf !== 'stretch auto')
						styles += '\tplace-self' + ': ' + placeSelf + ';\n';
					if (item.subGrid !== 'none') {
						gridStyles.forEach(function(grid) {
							if (grid.class === '.' + item.subGrid) {
								if(styles) grid.styles += styles;
								itemStyles.pop()
							}
						})
					} else {
						if (styles) itemStyles[itemStyles.length - 1].styles = styles;
						else itemStyles.pop()
					}
				})
			})
			return itemStyles
		},
	}
}
</script>