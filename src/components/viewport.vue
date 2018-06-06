<template>
	<div class="viewport" :style="{gridTemplateColumns: '1fr ' + gridWidth + ' 1fr', gridTemplateRows: '1fr ' + gridHeight + ' 1fr'}">
		<div class="top-control">
			<control origin='columns'></control>
		</div>
		<div class="left-control">
			<control origin='rows'></control>
		</div>
		<div class="grid-cell">
			<grid></grid>
		</div>
		<div class="right-control">
			<control origin='rows'></control>
		</div>
		<div class="bottom-control">
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
		currentGrid: function() {
			return this.$store.state.grid.currentGrid
		},
		gridHeight: function(){
			let container = this.$store.getters['grid/containerStyles'](this.currentGrid);
			if (container) return container.height;
			else return this.$store.state.grid[this.currentGrid].height
		},
		gridWidth: function(){
			let container = this.$store.getters['grid/containerStyles'](this.currentGrid);
			if (container) return container.width;
			else return this.$store.state.grid[this.currentGrid].width
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
	 border: 2px dashed #666;
	 min-height: 50px;
	 background: #212121;
	 display: grid;
	 color: #fff;
 }
</style>