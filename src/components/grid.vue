<template>
	<div class="container">
		<div :style="gridStyle" class="grid">
			<div class="cell-container" v-bind:key="i" v-for="i in cellsCount">
				<div class="cell">
					<div>{{ i }}</div>
					<span></span>
				</div>
			</div>
		</div>
		<div :style="gridStyle" class="grid overlay">
			<item :key="i + currentGrid" :sub-grid="subGrids[i-1]" :ref="currentGrid + '' + i " v-for="i in itemsCount" :class="{active: i - 1 == index}" @click.native="selectItem(i)" :style="cellStyles[i-1]">{{ i }}</item>
		</div>
	</div>

</template>

<script>
	import item from './item';
	export default {
		name: 'grid',
		components: {
			item
		},
		methods: {
			selectItem(index) {
				let refs = this.$refs;
				let el = this.currentGrid + '' + index;
				this.$store.commit('grid/selectItem', {index, el, refs});

			}
		},
		computed: {
			zoom: function() {
				return this.$store.state.grid.zoom;
			},
			currentGrid: function() {
				return this.$store.state.grid.currentGrid
			},
			gridStyle: function() {
				return this.$store.getters['grid/gridStyle'](this.currentGrid)
			},
			cellsCount: function() {
				return	this.$store.getters['grid/gridCellsCount'](this.currentGrid)
			},
			itemsCount: function() {
				return this.$store.state.grid[this.currentGrid].itemsCount
			},
			index: function() {
				return this.$store.state.grid[this.currentGrid].selectedItem;
			},
			cellStyles: function() {
				return this.$store.getters['grid/cellStyles'](this.currentGrid)
			},
			subGrids: function() {
				return this.$store.getters['grid/cellsSubGrids'](this.currentGrid)
			}
		},
		mounted(){
			let index = 1;
			let refs = this.$refs;
			let el = this.currentGrid + '' + index;
			this.$store.commit('grid/selectItem', {index, el, refs});
		},
		watch: {
			currentGrid: function() {
				let index = 1;
				let refs = this.$refs;
				let el = this.currentGrid + '' + index;
				this.$store.commit('grid/selectItem', {index, el, refs});
			},
			zoom: function() {
				let index = this.index ? this.index : 1;
				let refs = this.$refs;
				let el = this.currentGrid + '' + index;
				this.$store.commit('grid/selectItem', {index, el, refs});
			}
		}
	}
</script>

<style scoped>
	.grid {
		display: grid;
		box-shadow: inset 0 0 0 1px #666;
	}
	.container {
		position: relative;
	}
	.overlay {
		top: 0;
		left: 0;
		position: absolute;
	}
	.grid.overlay > div {
		opacity: .6;
		cursor: pointer;
		transition: opacity .2s;
	}
	.grid.overlay > div:hover {
		opacity: 1;
	}
	.grid.overlay > .active {
		opacity: .9;
	}
	.cell-container {
		width: 100%;
		height: 100%;	
	}
	.cell {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.grid > div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		opacity: .8;
	}
	.grid > div b {
		font-size: 16px;
	}
	.grid span {
		opacity: .2;
		background: #444;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		box-shadow: inset 0 0 0 1px #fff;
		left: 0;
		right: 0;
		bottom: 0;
		justify-content: center;
		z-index: 2;
		align-items: center;
	}
</style>