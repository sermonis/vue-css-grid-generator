<template>
	<div v-if="subGrid" class="item sub-item">
		<item :key="i" :sub-grid="subGrids[i-1]" :style="cellStyles[i-1]" v-for="i in itemsCount"></item>
	</div> 
	<div v-else class="item">
		<div><b><slot></slot></b></div>
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

<style scoped lang="stylus">
	.item
		display: flex;
		justify-content center
		align-items center
		box-sizing border-box
		overflow hidden
		min-height 1em
		min-width 1em
		background rgba(#604c8d, .4)

	.sub-item .item 
		box-shadow inset 0 0 0 1px #666
	.item div 
		position relative
		z-index 3
	.item span 
		position absolute
		top 0
		left 0
		right 0
		bottom 0
		background #604c8d
		opacity .8
		justify-content center
		z-index 2
		align-items center
</style>