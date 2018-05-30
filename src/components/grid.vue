<template>
	<div class="container">
		<div :style="gridStyle" class="grid">
			<div class="cell-container" v-for="i in cellsCount">
				<div class="cell">
					<div>{{ i }}</div>
					<span></span>
				</div>
			</div>
		</div>
		<div :style="gridStyle" class="grid overlay">
			<div ref="item" v-for="i in itemsCount" :class="{active: i - 1 == index}" @click="selectItem(i)" :style="cellStyles[i-1]">
				<div class="item">
					<div>Item <b>{{i}}</b></div>
					<span></span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'grid',
		methods: {
			selectItem(index) {
				let el = this.$refs.item[index-1]
				this.$store.commit('selectItem', {index, el});
			}
		},
		computed: {
			currentGrid: function() {
				return this.$store.state.grids.currentGrid
			},
			gridStyle: function() {
				return this.$store.getters.gridStyle(this.currentGrid)
			},
			cellsCount: function() {
				return	this.$store.getters.gridCellsCount(this.currentGrid)
			},
			itemsCount: function() {
				return this.$store.state.grids[this.currentGrid].itemsCount
			},
			index: function() {
				return this.$store.state.grids[this.currentGrid].selectedItem
			},
			cellStyles: function() {
				return this.$store.getters.cellStyles(this.currentGrid)
			}
		},
		mounted(){
			let index = 1;
			let el = this.$refs.item[index-1]
			this.$store.commit('selectItem', {index, el});
		},
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
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 30px;
		min-height: 30px;
	}
	.item div {
		position: absolute;
		z-index: 3;
	}
	.grid .item span {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		min-width: 30px;
		min-height: 30px;
		background: #6799ad;
		opacity: 1;
		justify-content: center;
		z-index: 2;
		align-items: center;
	}
	.grid span {
		opacity: .2;
		background: #444;
		position: absolute;
		width: 100%;
		height: 100%;
		min-width: 30px;
		min-height: 30px;
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