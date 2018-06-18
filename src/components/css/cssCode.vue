<template>
<pre>
<code :key='index' v-for="(grid, index) in gridStyles">
{{grid.class}} {
{{grid.styles}}
}
<code v-for="(item, index) in itemStyles" :key="index">
{{item.class}} {
{{item.styles}}
}
</code>
</code>
</pre>
</template>

<script>
export default {
	name: 'cssCode',
	computed: {
		itemStyles: function() {
			let store = this.$store;
			let grids = store.state.grid.gridsList;
			let itemStyles = [];
			grids.forEach(function(grid) {
				console.log(grid)
				if (grid === 'none') return null;
				let items = store.state.grid[grid].items;
				items.forEach(function(item, index) {
					itemStyles.push({
						class: '.' + grid + ' > div:nth-of-type(' + (index + 1) + ')',
						styles: ''
					});

					let styles = itemStyles[itemStyles.length - 1].styles;

					styles += '\tgrid-area' + ': ' + item.fromRow + ' / ' + item.fromCol + ' / ' + item.toRow + ' / ' + item.toCol + ';';
					styles += '\n\tplace-self' + ': ' + item.alignSelf + ' ' + item.justifySelf + ';';
					itemStyles[itemStyles.length - 1].styles = styles;
				})
			})
			return itemStyles
		},
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

				styles += '\talign-content' + ': ' + store.state.grid[grid].alignContent + ';';
				styles += '\n\talign-items' + ': ' + store.state.grid[grid].alignItems + ';';
				styles += '\n\tgap' + ': ' + store.state.grid[grid].rowsGap + ' ' + store.state.grid[grid].columnsGap + ';';
				styles += '\n\tgrid-auto-flow' + ': ' + store.state.grid[grid].gridAutoFlow + ';';
				styles += '\n\theight' + ': ' + store.state.grid[grid].height + ';';
				styles += '\n\twidth' + ': ' + store.state.grid[grid].width + ';';
				styles += '\n\tjustify-content' + ': ' + store.state.grid[grid].justifyContent + ';';
				styles += '\n\tjustify-items' + ': ' + store.state.grid[grid].justifyItems + ';';
				styles += '\n\tgrid-template-columns' + ': ' + store.state.grid[grid].templateColumns.join(' ') + ';';
				styles += '\n\tgrid-template-rows' + ': ' + store.state.grid[grid].templateRows.join(' ') + ';';
			
				gridStyles[gridStyles.length - 1].styles = styles;
			})
			return gridStyles;
		}
	}
}
</script>