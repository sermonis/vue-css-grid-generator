<template>
	<div class="viewport" :style="{gridTemplateColumns: '1fr ' + gridWidth + ' 1fr', gridTemplateRows: '1fr ' + gridHeight + ' 1fr'}">
		<div :style="columnsControls" class="top-control">
			<control origin='columns'></control>
		</div>
		<div :style="rowsControls" class="left-control">
			<control origin='rows'></control>
		</div>
		<div class="grid-cell">
			<grid></grid>
		</div>
		<div :style="rowsControls" class="right-control">
			<control origin='rows'></control>
		</div>
		<div :style="columnsControls" class="bottom-control">
			<control origin='columns'></control>
		</div>
	</div>
</template>
<script>
import grid from './grid';
import control from './control'
export default {
	components: {
		grid,
		control
	},
	name: 'viewport',
	computed: {
		zoom: function() {
			return this.$store.state.grid.zoom;
		},
		currentGrid: function() {
			return this.$store.state.grid.currentGrid
		},
		rowsControls: function() {
			if (this.currentGrid !== 'root') {
				return {
					alignItems: this.$store.getters['grid/containerStyles'](this.currentGrid).alignItems
				}
			}
		},
		columnsControls: function() {
			if (this.currentGrid !== 'root') {
				return {
					justifyItems: this.$store.getters['grid/containerStyles'](this.currentGrid).justifyContent
				}
			}
		},
		gridHeight: function(){
			let zoom = this.zoom;
			function applyZoom(value) {
				let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|fr|vw|vh|in|cm|mm|pt|pc)$/gm;
				if ( value !== 'auto' && value !== 'auto' && !/\d+(\.\d+)?%/.test(value)) {
					let group = value.split(divideIntoGroups)
					let num = parseFloat(group[1]);
					let unit = group[6]
					if (unit && unit !== 'fr') value = num * parseFloat(zoom) + unit;
				}
				return value
			}
			let container = this.$store.getters['grid/containerStyles'](this.currentGrid);
			let height;
			if (container) height = container.height;
			else height = this.$store.state.grid[this.currentGrid].height;
			if (height !== 'auto') {
				height = applyZoom(height);
			}
			if (/\d+(\.\d+)?%/.test(height)) return 'calc(100% - 3em)'; 
			else return height;
		},
		gridWidth: function(){
			let zoom = this.zoom;
			function applyZoom(value) {
				let divideIntoGroups = /((\d+)((.)?(\d)+)?)(px|em|ex|%|fr|vw|vh|in|cm|mm|pt|pc)$/gm;
				if ( value !== 'auto' && value !== 'auto' && !/\d+(\.\d+)?%/.test(value)) {
					let group = value.split(divideIntoGroups)
					let num = parseFloat(group[1]);
					let unit = group[6]
					if (unit && unit !== 'fr') value = num * parseFloat(zoom) + unit;
				}
				return value
			}
			let container = this.$store.getters['grid/containerStyles'](this.currentGrid);
			let width;
			if (container) width = container.width;
			else width = this.$store.state.grid[this.currentGrid].width;
			if (width !== 'auto') {
				width = applyZoom(width);
			}
			if (/\d+(\.\d+)?%/.test(width)) return 'calc(100% - 3em)'; 
			else return width;
		},
	},
}
</script>

<style scoped>
 .viewport {
	display: grid;
	background: #222;
	height: 100%;
	margin: auto;
	width: 100%;
	transition: all .2s;
	grid-template-areas: ' . top . ''left grid right'' . bottom . '
 }
 .viewport .top-control {
	 grid-area: top;
	 border-top: none;
	 border-bottom: none;
	 align-items: start;
 }
 .viewport .left-control {
	 grid-area: left;
	 border-left: none;
	 border-right: none;
	 justify-items: start;
 }
 .viewport .right-control {
	 grid-area: right;
	 border-left: none;
	 border-right: none;
	 justify-items: end;
 }
 .viewport .bottom-control {
	 grid-area: bottom;
	 border-bottom: none;
	 border-top: none;
	 align-items: end
 }
 .viewport .grid-cell {
	 grid-area: grid;
	 border: none;
	 box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .6);
	 background: rgba(0,0,0, .2)
	 }
 .viewport > div {
	 min-height: 3em;
	 min-width: 3em;
	 background: #212121;
	 display: grid;
	 color: #fff;
 }
</style>