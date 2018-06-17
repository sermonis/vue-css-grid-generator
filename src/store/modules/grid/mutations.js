import Vue from 'vue';

const mutations = {
	addGrid(state, value) {
		let currentGrid = state.currentGrid;
		let parentGrids = [];
		let selectedIndex = state.selectedIndex;
		let selectedItem = state[currentGrid].selectedItem;
		
		//Add sub-grid container item as parrent to parentsGrid property
		parentGrids.push({name: currentGrid, index: selectedIndex + 1});

		// Set subGrid property of item to choosen subgrid
		Vue.set(state[currentGrid].items[selectedItem], 'subGrid', value)

		// Add New Grid to the state
		Vue.set(state, value, {
		columns: 2,
		rows: 2,
		columnsGap: '0',
		rowsGap: '0',
		itemsCount: 4,
		gridAutoFlow: 'row',
		justifyContent: 'start',
		width: '100%',
		height: '100%',
		alignContent: 'start',
		selectedItem: 0,
		justifyItems: 'stretch',
		parentGrids: parentGrids,
		alignItems: 'stretch',
		templateColumns: ['1fr', '1fr'],
		templateRows: ['1fr', '1fr'],
		items: [ 
		{subGrid: 'none', fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{subGrid: 'none', fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{subGrid: 'none', fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{subGrid: 'none', fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'}
		]
	});

		// Set container of grid to first linked item container
		let container = state[value].parentGrids[0].name + state[value].parentGrids[0].index;
		Vue.set(state[value], 'container', container);

		// Add created grid to grids list
		state.gridsList.push(value)
	},
	changeCurrentGrid(state, value) {
		// Change current grid to selected or created
		state.currentGrid = value;
		let zoom = state.zoom;

		// Loop through grids and set cached container sizes if it's possible from current view
		for (let grid in state) {
			if (state[grid].container && state.refs[state[grid].container] && state.refs[state[grid].container][0]) {
				state.refs[state[grid].container][0].$el.style.height = '100%';
				state.refs[state[grid].container][0].$el.style.width = '100%';
				let sizes = {
					width: state.refs[state[grid].container][0].$el.clientWidth / zoom + 'px',
					height: state.refs[state[grid].container][0].$el.clientHeight / zoom + 'px'
				}
				Vue.set(state[grid], 'cachedContainerSizes', sizes)
			}
		}

		// Set original grid sizes to container if selected grid is root
		if (value === 'root') Vue.set(state, 'container', {
			width: state[value].width,
			height: state[value].height
		});

		// In other case set cached value
		 else {
			Vue.set(state, 'container', state[value].cachedContainerSizes);
		}
	},
	changeZoom(state, value) {
		state.zoom = value;
	},
	changeOption(state, {value, field}) {
		state[state.currentGrid][field] = value;
		function cutItemsCount(state) {
			let maxGridSize = state[state.currentGrid].templateColumns.length
												* state[state.currentGrid].templateRows.length;
			if (state[state.currentGrid].itemsCount > maxGridSize) {
				state[state.currentGrid].itemsCount = maxGridSize;
			}
		}
		if (field == 'columns' && value !== state[state.currentGrid].templateColumns.length)	{

			if (value > state[state.currentGrid].templateColumns.length) 
				while (value > state[state.currentGrid].templateColumns.length) 
					state[state.currentGrid].templateColumns.push('1fr');

			if (value < state[state.currentGrid].templateColumns.length) 
				while (value < state[state.currentGrid].templateColumns.length) 
					state[state.currentGrid].templateColumns.pop();
			cutItemsCount(state);
		}

		if (field == 'rows' && value !== state[state.currentGrid].templateRows.length)  {

			if (value > state[state.currentGrid].templateRows.length) 
				while (value > state[state.currentGrid].templateRows.length) 
					state[state.currentGrid].templateRows.push('1fr');

			if (value < state[state.currentGrid].templateRows.length) 
				while (value < state[state.currentGrid].templateRows.length) 
					state[state.currentGrid].templateRows.pop();  
			cutItemsCount(state);
		}

		if (field === 'itemsCount') {
			if (value > state[state.currentGrid].items.length) 
				while (value > state[state.currentGrid].items.length) 
					state[state.currentGrid].items.push({subGrid: 'none', fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'});

			if (value < state[state.currentGrid].items.length) {
				Vue.set(state[state.currentGrid], 'selectedItem', value - 1);
				while (value < state[state.currentGrid].items.length) {
					let currentIndex = state[state.currentGrid].items.length - 1;
					let itemSubGrid = state[state.currentGrid].items[currentIndex].subGrid;
					if (itemSubGrid !== 'none') {
						let index = state[state.currentGrid].items.length - 1;
						Vue.set(state[state.currentGrid].items[index], 'subGrid', 'none')
						function calcNodes(grid) {
							let nodes = []
							state[grid].items.forEach(function(item, index) {
								if (item.subGrid !== 'none'){ 
									nodes.push({grid: item.subGrid, parent: {name: grid, index: index + 1}});
									let newNodes = calcNodes(item.subGrid);
									nodes = nodes.concat(newNodes);
								} 
							})
							return nodes;
						}
						let nodes = calcNodes('root');

						state.gridsList.forEach(function(grid) {
							if (grid === 'root' || grid === 'none') return null;
							else {
								let parents = [];
								nodes.forEach(function(node) {
									if (node.grid == grid) parents.push(node.parent);
								})
								console.log(parents)
								Vue.set(state[grid], 'parentGrids', parents)
								if (parents.length === 0) Vue.set(state[grid], 'container', 'root0');
								if (parents.length === 1) Vue.set(state[grid], 'container', state[grid].parentGrids[0].name + state[grid].parentGrids[0].index);
							}
						})

					}
					state[state.currentGrid].items.pop();
				}
			}
		}
		
	},
	setItemSubGrid(state, {value, grid, index}) {
		Vue.set(state[grid].items[index], 'subGrid', value)

		function calcNodes(grid) {
			let nodes = []
			state[grid].items.forEach(function(item, index) {
				if (item.subGrid !== 'none'){ 
					nodes.push({grid: item.subGrid, parent: {name: grid, index: index + 1}});
					let newNodes = calcNodes(item.subGrid);
					nodes = nodes.concat(newNodes);
				} 
			})
			return nodes;
		}
		let nodes = calcNodes('root');


		state.gridsList.forEach(function(grid) {
			if (grid === 'root' || grid === 'none') return null;
			else {
				let parents = [];
				nodes.forEach(function(node) {
					if (node.grid == grid) parents.push(node.parent);
				})
				Vue.set(state[grid], 'parentGrids', parents)
				if (parents.length === 0) Vue.set(state[grid], 'container', 'root0');
				if (parents.length === 1) Vue.set(state[grid], 'container', state[grid].parentGrids[0].name + state[grid].parentGrids[0].index);
			}
		})
	},
	changeCellOption(state, {value, field, index}) {
		Vue.set(state[state.currentGrid].items[index], field, value)
	},
	resizeField(state, {origin, index, value}) {
		if (origin === 'columns') {
			Vue.set(state[state.currentGrid].templateColumns, index, value)
		} else if (origin === 'rows') {
			Vue.set(state[state.currentGrid].templateRows, index, value)
		}
	},
	selectItem(state, {index, el, refs}) {
		Vue.set(state[state.currentGrid], 'selectedItem', index - 1);
		Vue.set(state, 'refs', refs);
		state.selectedIndex = index - 1;
		state.selectedElement = el;
	}
}

export default mutations