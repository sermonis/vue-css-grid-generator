import Vue from 'vue';

const mutations = {
	addGrid(state, value) {
		let currentGrid = state.currentGrid;
		let selectedItem = state[currentGrid].selectedItem;
		let selectedIndex = state.selectedIndex;
		Vue.set(state[currentGrid].items[selectedItem], 'subGrid', value)
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
		parentIndex: selectedIndex,
		parentGrid: currentGrid,
		alignItems: 'stretch',
		templateColumns: ['1fr', '1fr'],
		templateRows: ['1fr', '1fr'],
		items: [ 
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'}
		]
	});
		Vue.set(state[value], 'container', state.selectedElement);
	},
	changeCurrentGrid(state, value) {
		// Change current grid to selected or created
		state.currentGrid = value;

		// Loop through grids and set cached container sizes if it's possible from current view
		for (let grid in state) {
			if (state[grid].container && state.refs[state[grid].container][0]) {
				state.refs[state[grid].container][0].$el.style.height = '100%';
				state.refs[state[grid].container][0].$el.style.width = '100%';
				let sizes = {
					width: state.refs[state[grid].container][0].$el.clientWidth + 'px',
					height: state.refs[state[grid].container][0].$el.clientHeight + 'px'
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
		if (field == 'columns' && value !== state[state.currentGrid].templateColumns.length)	{

			if (value > state[state.currentGrid].templateColumns.length) 
				while (value > state[state.currentGrid].templateColumns.length) 
					state[state.currentGrid].templateColumns.push('1fr');

			if (value < state[state.currentGrid].templateColumns.length) 
				while (value < state[state.currentGrid].templateColumns.length) 
					state[state.currentGrid].templateColumns.pop();  
		}

		if (field == 'rows' && value !== state[state.currentGrid].templateRows.length)  {

			if (value > state[state.currentGrid].templateRows.length) 
				while (value > state[state.currentGrid].templateRows.length) 
					state[state.currentGrid].templateRows.push('1fr');

			if (value < state[state.currentGrid].templateRows.length) 
				while (value < state[state.currentGrid].templateRows.length) 
					state[state.currentGrid].templateRows.pop();  
		}

		if (field === 'itemsCount') {
			if (value > state[state.currentGrid].items.length) 
				while (value > state[state.currentGrid].items.length) 
					state[state.currentGrid].items.push({fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'});

			if (value < state[state.currentGrid].items.length) {
				Vue.set(state[state.currentGrid], 'selectedItem', value - 1);
				while (value < state[state.currentGrid].items.length) 
					state[state.currentGrid].items.pop();
			}
		}
		
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