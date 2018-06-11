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
				return this.$store.state.grid.currentGrid
			},
			fields: function() {
				return this.$store.getters['grid/fields'](this.origin, this.currentGrid);
			},
			fieldsSize: function() {
				let height = this.$store.state.grid[this.currentGrid].height;
				let width = this.$store.state.grid[this.currentGrid].width;
				if (this.currentGrid === 'root') {
					if (/\d+(\.\d+)?%/.test(height)) height = '100%';
					if (/\d+(\.\d+)?%/.test(width)) width = '100%';
				}
				let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/gm;
				if (width !== 'auto' && width !== 'auto' && !/\d+(\.\d+)?%/.test(width)) {
					let group = width.split(divideIntoGroups)
					let value = parseFloat(group[1]);
					let unit = group[6]
					width = value * parseFloat(this.zoom) + unit;
				}
				if (height !== 'auto' && height !== 'auto' && !/\d+(\.\d+)?%/.test(height)) {
					let group = height.split(divideIntoGroups)
					let value = parseFloat(group[1]);
					let unit = group[6]
					height = value * parseFloat(this.zoom) + unit;
				}
				if (this.origin === 'columns') return {
					gridTemplateColumns: this.$store.state.grid[this.currentGrid].templateColumns.join(' '),
					gridColumnGap: this.$store.state.grid[this.currentGrid].columnsGap,
					width: width,
					justifyContent: this.$store.state.grid[this.currentGrid].justifyContent
				}; else if (this.origin === 'rows') return {
					gridTemplateRows: this.$store.state.grid[this.currentGrid].templateRows.join(' '),
					gridRowGap: this.$store.state.grid[this.currentGrid].rowsGap,
					height: height,
					alignContent: this.$store.state.grid[this.currentGrid].alignContent,
				}
			}
		},
		methods: {
			resize: function(index, event) {
				let value = event.target.value;
				let origin = this.origin
				this.$store.commit('grid/resizeField', {origin, index, value})
			}
		}
	}
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
		font-size: 16px;
		background: transparent;
		color: #fff;
		height: 100%;
		font-family: Helvetica Neue;
		box-shadow: 0 0 1px #444;
		padding: 0;
		background: #141414;
		margin: 0;
	}
	.stripe input:focus {
		outline: none;
	}
</style>