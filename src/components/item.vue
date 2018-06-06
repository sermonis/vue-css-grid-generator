<template>
	<div v-if="subGrid" class="item sub-item">
		<item :key="i" :sub-grid="subGrids[i-1]" :style="cellStyles[i-1]" v-for="i in itemsCount"> <b>{{ subGrid }}</b> {{ i }}</item>
	</div> 
	<div v-else class="item">
		<div>Item <b><slot></slot></b></div>
		<span></span>
	</div> 

</template>

<script>
	export default {
		name: 'item',
		props: ['subGrid'],
		computed: {
			gridStyle: function() {
				if (this.subGrid) return this.$store.getters['grid/gridStyle'](this.subGrid)
			},
			itemsCount: function() {
				if (this.subGrid) return this.$store.state.grid[this.subGrid].itemsCount
			},
			cellStyles: function() {
				if (this.subGrid) return this.$store.getters['grid/cellStyles'](this.subGrid)
			},
			subGrids: function() {
				if (this.subGrid) return this.$store.getters['grid/cellsSubGrids'](this.subGrid)
			}

		}
	}
</script>

<style scoped>
	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 30px;
		min-height: 30px;
	}
	.sub-item .item {
		border: 1px solid rgba(138, 186, 214, .9);
	}
	.item div {
		position: relative;
		z-index: 3;
	}
	.item span {
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
</style>