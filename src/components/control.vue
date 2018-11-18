<template>
	<div :style="fieldsSize" class="stripe">
		<input @input="resize(index, $event)" :value="i" :key="index" v-for="(i, index) in fields" type="text">
	</div>
</template>

<script>
export default {
	name: 'control',
	props: ['origin'],
	computed: {
		zoom: function() {
			return this.$store.state.grid.zoom;
		},
		currentGrid: function() {
			return this.$store.state.grid.currentGrid;
		},
		fields: function() {
			return this.$store.getters['grid/fields'](this.origin, this.currentGrid);
		},
		fieldsSize: function() {
			let height = this.$store.state.grid[this.currentGrid].height;
			let width = this.$store.state.grid[this.currentGrid].width;
			let zoom = this.zoom;
			let gridTemplateColumns = this.$store.state.grid[this.currentGrid]
				.templateColumns;
			let gridTemplateRows = this.$store.state.grid[this.currentGrid]
				.templateRows;
			let gridColumnGap = this.$store.state.grid[this.currentGrid].columnsGap;
			let gridRowGap = this.$store.state.grid[this.currentGrid].rowsGap;

			function applyZoom(value) {
				let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|vw|vh|em|ex|%|fr|in|cm|mm|pt|pc)$/gm;
				if (
					value !== 'auto' &&
					value !== 'auto' &&
					!/\d+(\.\d+)?%/.test(value)
				) {
					let group = value.split(divideIntoGroups);
					let num = parseFloat(group[1]);
					let unit = group[6];
					if (unit && unit !== 'fr') value = num * parseFloat(zoom) + unit;
				}
				return value;
			}
			if (this.currentGrid === 'root') {
				if (/\d+(\.\d+)?%/.test(height)) height = '100%';
				if (/\d+(\.\d+)?%/.test(width)) width = '100%';
			}
			height = applyZoom(height);
			width = applyZoom(width);
			gridColumnGap = applyZoom(gridColumnGap);
			gridRowGap = applyZoom(gridRowGap);
			gridTemplateColumns = gridTemplateColumns.map(function(value) {
				return applyZoom(value);
			});
			gridTemplateRows = gridTemplateRows.map(function(value) {
				return applyZoom(value);
			});
			if (this.origin === 'columns')
				return {
					gridTemplateColumns: gridTemplateColumns.join(' '),
					gridColumnGap: gridColumnGap,
					width: width,
					justifyContent: this.$store.state.grid[this.currentGrid]
						.justifyContent
				};
			else if (this.origin === 'rows')
				return {
					gridTemplateRows: gridTemplateRows.join(' '),
					gridRowGap: gridRowGap,
					height: height,
					alignContent: this.$store.state.grid[this.currentGrid].alignContent
				};
		}
	},
	methods: {
		resize: function(index, event) {
			let value = event.target.value;
			let origin = this.origin;
			this.$store.commit('grid/resizeField', { origin, index, value });
		}
	}
};
</script>

<style scoped>
.stripe {
	display: grid;
	height: 100%;
	width: 100%;
}
.stripe input {
	text-align: center;
	border: none;
	width: 100%;
	font-size: 14px;
	letter-spacing: 0.1em;
	background: transparent;
	color: #fff;
	height: 100%;
	font-family: Poppins;
	box-shadow: 0 0 1px #444;
	padding: 0;
	background: #141414;
	margin: 0;
}
.stripe input:focus {
	outline: none;
}
</style>