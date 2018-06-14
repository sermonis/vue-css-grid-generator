<template>
	<div class="container">
		<div class="props">
			<div>
				<label for="from-col">From Column:</label> <input id="from-col" v-model="fromCol" type="text">
				<label for="to-col">To Column:</label> <input id="to-col" v-model="toCol"  type="text">
			</div>
			<div>
				<label for="from-row">From Row:</label> <input id="from-row" v-model="fromRow" type="text">
				<label for="to-row">To Row:</label> <input id="to-row" v-model="toRow" type="text">
			</div>

			<div>
				<label for="justify-self">Align Horizontal:</label> <select id="justify-self" v-model="justifySelf">
				  <option value="start">Left</option>
				  <option value="end">Right</option>
				  <option value="center">Center</option>
				  <option value="stretch">Stretch</option>
					<option value="auto">auto</option>
				</select>

				<label for="align-self">Align Vertical:</label> <select id="align-self" v-model="alignSelf">
				  <option value="start">Top</option>
				  <option value="end">Bottom</option>
				  <option value="center">Center</option>
				  <option value="stretch">Stretch</option>
					<option value="auto">auto</option>
				</select>
			</div>


			<div>
				<label for="zoom">Zoom:</label>
				<select v-model="zoom" id="zoom">
					<option value="2">200%</option>
					<option value="1.5">150%</option>
					<option value="1.25">125%</option>
					<option value="1">100%</option>
					<option value="0.75">75%</option>
					<option value="0.5">50%</option>
					<option value="0.25">25%</option>
				</select>
				<label for="apply-grid">Apply Grid:</label>

				<select id="apply-grid">
					<option value="root">None</option>
					<option value="lol">lol</option>
					<option value="kek">kek</option>
				</select>
			</div>

		</div>

		<div class="sub-grid">
			<label for="current-grid">Current Grid:</label>
			<select id="current-grid" v-model="currentGrid">
				<option value="root">Root</option>
				<option value="lol">lol</option>
				<option value="kek">kek</option>
			</select>
			<label for="add-subgrid">Add Sub-Grid</label>
			<div>
				<form v-on:submit.prevent="addGrid">
					<input type="text" id="add-subgrid">
					<input type="submit" value="Add">
				</form>

			</div>

		</div>

	</div>

</template>
<script>
	export default {
		name: 'itemSettings',
		computed: {
			zoom: {
				get() {return this.$store.state.grid.zoom},
				set(value) {this.$store.commit('grid/changeZoom', value)}
			},
			currentGrid: { get() {
				return this.$store.state.grid.currentGrid},
			  set (value) {this.changeCurrentGrid(value)}
			},
			index: function() {
				return this.$store.state.grid[this.currentGrid].selectedItem
			},
			fromCol: { get() {
				return this.$store.state.grid[this.currentGrid].items[this.index].fromCol},
			  set (value) {this.updateCellOption(value, 'fromCol', this.index)}
			},
			toCol: { get() {return this.$store.state.grid[this.currentGrid].items[this.index].toCol},
			  set (value) {this.updateCellOption(value, 'toCol', this.index)}
			},
			fromRow: { get() {return this.$store.state.grid[this.currentGrid].items[this.index].fromRow},
			  set (value) {this.updateCellOption(value, 'fromRow', this.index)}
			},
			toRow: { get() {return this.$store.state.grid[this.currentGrid].items[this.index].toRow},
			  set (value) {this.updateCellOption(value, 'toRow', this.index)}
			},
			justifySelf: { get() {return this.$store.state.grid[this.currentGrid].items[this.index].justifySelf},
			  set (value) {this.updateCellOption(value, 'justifySelf', this.index)}
			},
			alignSelf: { get() {return this.$store.state.grid[this.currentGrid].items[this.index].alignSelf},
			  set (value) {this.updateCellOption(value, 'alignSelf', this.index)}
			},
		},
		methods: {
			updateCellOption(value, field, index) {
				this.$store.commit('grid/changeCellOption', {value, field, index})
			},
			addGrid(event) {
				this.$store.dispatch('grid/addGrid', event.target[0].value);
			},
			changeCurrentGrid(value) {
				this.$store.commit('grid/changeCurrentGrid', value)
			}
		}
	}
</script>
<style scoped lang="stylus">
.container
	display grid
	background #161616
	grid-template-columns 1fr 320px
.props
	color #fff
	display flex
	padding 0 30px
	-webkit-flex-direction row 
	-ms-flex-direction row 
	flex-direction row
	height 100%
	align-items center
	justify-content space-around
	div
		text-align left
		display flex
		-webkit-flex-direction column 
		-ms-flex-direction column 
		flex-direction column
		align-items space-between
		label
			font-family Helvetica
			font-size 11px
			font-weight 800
			margin-bottom 10px 
			opacity .5
		input,
		select
			width 150px
			margin-bottom 20px
			height 30px
			border none
			color #fff
			background #000
			border 2px solid #212121
			border-radius 5px
			-webkit-box-sizing border-box
			   -moz-box-sizing border-box
			        box-sizing border-box
			padding 0 10px
			&:last-child 
				margin-bottom 0 
		input:focus,
		select:focus
			  outline none
			  border-color #007AFF
			
.sub-grid
	color #fff
	display flex
	padding 0 30px
	align-self center
	-webkit-flex-direction column 
	-ms-flex-direction column 
	flex-direction column 
	text-align left
	label
		font-family Helvetica
		font-size 11px
		font-weight 800
		margin-bottom 10px 
		opacity .5
	input,
	select
		width 150px
		margin-bottom 20px
		height 30px
		border none
		color #fff
		background #000
		border 2px solid #212121
		border-radius 5px
		-webkit-box-sizing border-box
		   -moz-box-sizing border-box
		        box-sizing border-box
		padding 0 10px
		&:last-child 
			margin-bottom 0

	input:focus,
	select:focus
		  outline none
		  border-color #007AFF
	select
		width 200px
	div
		display flex
		-webkit-flex-direction row 
		-ms-flex-direction row 
		flex-direction row
		input
			width 120px
			margin-bottom 0 
		input[type='submit']
			width 70px
			margin-left 10px
			background linear-gradient(0deg, #007AFF 0%, #68abf5 100%)
			cursor pointer
			&:active
				border-color: #212121
			&:focus
				border-color: #212121
				outline none
			&:hover
				background linear-gradient(0deg, #0e56a5 0%, #007AFF 100%)
</style>