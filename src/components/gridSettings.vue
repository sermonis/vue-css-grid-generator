<template>
<div class="settings">
	<div class="container-controlls">
		<div class="container-size">
			<h2>Container Size</h2>
			<div>
				<div>
					<label for="container-width">Width:</label>
					<input id="container-width" v-model="width" type="text">
				</div>
				<div>
					<label for="container-height">Height:</label>
					<input id="container-height" v-model="height" type="text">
				</div>
			</div>
		</div>
		<div class="grid-size">
			<h2>Grid Size</h2>
			<div>
				<div>
					<label for="columns-count">Columns:</label>
					<input min=1 id="columns-count" v-model.number='columns' type="number">
				</div>
				<div>
					<label for="rows-count">Rows:</label>
					<input min=1 id="rows-count" v-model.number='rows' type="number">
				</div>
			</div>
		</div>
		<div class="grid-gap">
			<h2>Grid Gaps</h2>
			<div>
				<div>
					<label for="columns-gap">Column:</label>
					<input id="columns-gap" v-model="columnsGap" type="text">
				</div>
				<div>
					<label for="rows-gap">Row: </label>
					<input id="rows-gap" v-model="rowsGap" type="text">
				</div>
			</div>
		</div>
		<div class="content">
			<h2>Content</h2>
			<div>
				<div>
					<label for="items-count">Items Count: </label>
					<input min=1 :max='this.maxCount' id="items-count" type='number' v-model.number="itemsCount">
				</div>
				<div>
					<label for="auto-flow">Auto Flow:</label>
					<select id="auto-flow" v-model="gridAutoFlow">
						<option value="row">Row</option>
						<option value="column">Column</option>
						<option value="row dense">Row Dense</option>
						<option value="column dense">Column Dense</option>
					</select>
				</div>
			</div>
		</div>
		<div class="align-items">
			<h2>Align Items</h2>
			<div>
				<div>
					<label for="justify-items">Horizontal:</label>
					<select id="justify-items" v-model="justifyItems">
						<option value="start">Left</option>
						<option value="end">Right</option>
						<option value="center">Center</option>
						<option value="stretch">Stretch</option>
					</select>
				</div>
				<div>
					<label for="align-items">Vertical:</label>
					<select id="align-items" v-model="alignItems">
						<option value="start">Top</option>
						<option value="end">Bottom</option>
						<option value="center">Center</option>
						<option value="stretch">Stretch</option>
					</select>
				</div>
			</div>
		</div>
		<div class="align-table">
			<h2>Align Table</h2>
			<div>
				<div>
					<label for="justify-content">Horizontal</label>
					<select id="justify-content" v-model="justifyContent">
						<option value="start">Left</option>
						<option value="end">Right</option>
						<option value="center">Center</option>
						<option value="space-around">Space Around</option>
						<option value="space-between">Space Between</option>
						<option value="space-evenly">Space Evenly</option>
					</select>
				</div>
				<div>
					<label for="align-content">Vertical:</label>
					<select id="align-content" v-model="alignContent">
						<option value="start">Top</option>
						<option value="end">Bottom</option>
						<option value="center">Center</option>
						<option value="space-around">Space Around</option>
						<option value="space-between">Space Between</option>
						<option value="space-evenly">Space Evenly</option>
					</select>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: 'gridSettings',
	computed: {
		currentGrid: function() {
			return this.$store.state.grid.currentGrid;
		},
		width: {
			get() {
				return this.$store.state.grid[this.currentGrid].width;
			},
			set(value) {
				this.updateOption(value, 'width');
			}
		},

		height: {
			get() {
				return this.$store.state.grid[this.currentGrid].height;
			},
			set(value) {
				this.updateOption(value, 'height');
			}
		},

		columns: {
			get() {
				return this.$store.state.grid[this.currentGrid].columns;
			},
			set(value) {
				this.updateOption(value, 'columns');
			}
		},

		rows: {
			get() {
				return this.$store.state.grid[this.currentGrid].rows;
			},
			set(value) {
				this.updateOption(value, 'rows');
			}
		},

		maxCount: function() {
			return (
				this.$store.state.grid[this.currentGrid].rows *
				this.$store.state.grid[this.currentGrid].columns
			);
		},

		columnsGap: {
			get() {
				return this.$store.state.grid[this.currentGrid].columnsGap;
			},
			set(value) {
				this.updateOption(value, 'columnsGap');
			}
		},

		rowsGap: {
			get() {
				return this.$store.state.grid[this.currentGrid].rowsGap;
			},
			set(value) {
				this.updateOption(value, 'rowsGap');
			}
		},

		itemsCount: {
			get() {
				let value = this.$store.state.grid[this.currentGrid].itemsCount;
				if (value > 0) return value;
				else return 1;
			},
			set(value) {
				if (value < 1) this.updateOption(1, 'itemsCount');
				else if (value <= this.maxCount) this.updateOption(value, 'itemsCount');
				else this.updateOption(this.maxCount, 'itemsCount');
			}
		},

		gridAutoFlow: {
			get() {
				return this.$store.state.grid[this.currentGrid].gridAutoFlow;
			},
			set(value) {
				this.updateOption(value, 'gridAutoFlow');
			}
		},

		alignItems: {
			get() {
				return this.$store.state.grid[this.currentGrid].alignItems;
			},
			set(value) {
				this.updateOption(value, 'alignItems');
			}
		},

		justifyItems: {
			get() {
				return this.$store.state.grid[this.currentGrid].justifyItems;
			},
			set(value) {
				this.updateOption(value, 'justifyItems');
			}
		},

		alignContent: {
			get() {
				return this.$store.state.grid[this.currentGrid].alignContent;
			},
			set(value) {
				this.updateOption(value, 'alignContent');
			}
		},

		justifyContent: {
			get() {
				return this.$store.state.grid[this.currentGrid].justifyContent;
			},
			set(value) {
				this.updateOption(value, 'justifyContent');
			}
		}
	},
	methods: {
		updateOption: function(value, field) {
			this.$store.commit('grid/changeOption', { value, field });
		}
	}
};
</script>
<style scoped>
.container-controlls {
	display: flex;
	text-align: left;
	-webkit-justify-content: space-around;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 40px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	background: #050505;
	align-content: space-between;
	font-family: Poppins;
	width: 320px;
	text-align: left;
}
.container-controlls > div {
	color: #fff;
	text-align: left;
	width: 100%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 13px;
}
.container-controlls > div > div {
	display: flex;
	justify-content: space-between;
}

h2 {
	margin: 30px 0 10px;
	opacity: 0.7;
	font-size: 10px;
	text-transform: uppercase;
	font-family: Poppins;
	letter-spacing: 0.05em;
	font-weight: 900;
}

label {
	font-family: Poppins;
	font-size: 11px;
	font-weight: 800;
	opacity: 0.5;
}

input,
select {
	width: 100px;
	margin-top: 8px;
	margin-bottom: 10px;
	height: 30px;
	border: none;
	color: #fff;
	background: #000;
	border: 2px solid #212121;
	border-radius: 5px;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	padding: 0 10px;
}
input:focus,
select:focus {
	outline: none;
	border-color: #007aff;
}
.grid-misc label {
	line-height: 30px;
}
.grid-misc input {
	margin: 0;
}
.container-controlls > .grid-misc > div {
	margin: 10px 0;
}
</style>