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
			currentGrid: function() {
				return this.$store.state.grids.currentGrid
			},
			fields: function() {
				return this.$store.getters.fields(this.origin, this.currentGrid);
			},
			fieldsSize: function() {
				if (this.origin === 'columns') return {
					gridTemplateColumns: this.$store.state.grids[this.currentGrid].templateColumns.join(' '),
					gridColumnGap: this.$store.state.grids[this.currentGrid].columnsGap
				}; else if (this.origin === 'rows') return {
					gridTemplateRows: this.$store.state.grids[this.currentGrid].templateRows.join(' '),
					gridRowGap: this.$store.state.grids[this.currentGrid].rowsGap
				}
			}
		},
		methods: {
			resize: function(index, event) {
				let value = event.target.value;
				let origin = this.origin
				this.$store.commit('resizeField', {origin, index, value})
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