import Vue from 'Vue';
import Vuex from 'Vuex';

Vue.use(Vuex);

const state = {
	currentGrid: 'root',
	root: {
		width: '820px',
		height: '640px',
		columns: 2,
		rows: 2,
		columnsGap: '0',
		rowsGap: '0',
		itemsCount: 4,
		gridAutoFlow: 'row',
		justifyContent: 'start',
		alignContent: 'start',
		justifyItems: 'stretch',
		alignItems: 'stretch',
		templateColumns: ['1fr', '1fr'],
		templateRows: ['1fr', '1fr'],
		selectedItem: 0,
		items: [
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'}
		]
	},
}
const getters = {
	gridStyle: state => (grid) => {
		return {
			height: state[grid].height,
			width: state[grid].width,
			gridColumnGap: state[grid].columnsGap,
			gridRowGap: state[grid].rowsGap,
			gridTemplateColumns: state[grid].templateColumns.join(' '),
			gridTemplateRows: state[grid].templateRows.join(' '),
			gridAutoFlow: state[grid].gridAutoFlow,
			justifyContent: state[grid].justifyContent,
			justifyItems: state[grid].justifyItems,
			alignContent: state[grid].alignContent,
			alignItems: state[grid].alignItems
		}
	},
	cellStyles: (state, getters) => (grid) => {
		let styles = [];
		state[grid].items.map((item) => {
			if (item.subGrid) {
				styles.push({
					gridColumn: item.fromCol + '/' + (!isNaN(parseInt(item.toCol)) ? parseInt(item.toCol) + 1 : item.toCol),
					gridRow: item.fromRow + '/' + (!isNaN(parseInt(item.toRow)) ? parseInt(item.toRow) + 1 : item.toRow),
					justifySelf: item.justifySelf,
					alignSelf: item.alignSelf,
					... getters.gridStyle(item.subGrid),
					display: 'inline-grid'
				})
			} else {
				styles.push({
					gridColumn: item.fromCol + '/' + (!isNaN(parseInt(item.toCol)) ? parseInt(item.toCol) + 1 : item.toCol),
					gridRow: item.fromRow + '/' + (!isNaN(parseInt(item.toRow)) ? parseInt(item.toRow) + 1 : item.toRow),
					justifySelf: item.justifySelf,
					alignSelf: item.alignSelf,
				})
			}
		});
		return styles;
	},
	gridCellsCount: state => (grid) => state[grid].columns * state[grid].rows,
	fields: state => (origin, grid) => {
		if (origin === 'columns') {
			return state[grid].templateColumns
		} else if (origin === 'rows') {
			return state[grid].templateRows
		}
	}
}
const mutations = {
	addGrid(state, value) {
		let currentGrid = state.currentGrid;
		let selectedItem = state[currentGrid].selectedItem;
		Vue.set(state[currentGrid].items[selectedItem], 'subGrid', value)
		Vue.set(state, value, {
		columns: 2,
		rows: 2,
		columnsGap: '0',
		rowsGap: '0',
		itemsCount: 4,
		gridAutoFlow: 'row',
		justifyContent: 'start',
		alignContent: 'start',
		justifyItems: 'stretch',
		alignItems: 'stretch',
		templateColumns: ['1fr', '1fr'],
		templateRows: ['1fr', '1fr'],
		selectedItem: 0,
		items: [
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'}
		]
	});
		Vue.set(state[value], 'width', state.selectedElement.clientWidth + 'px');
		Vue.set(state[value], 'height', state.selectedElement.clientHeight + 'px');
		state.currentGrid = value
		console.log(state[value])
	},
	changeCurrentGrid(state, value) {
		state.currentGrid = value
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
	selectItem(state, {index, el}) {
		state[state.currentGrid].selectedItem = index - 1;
		state.selectedElement = el;
	}
}

export default {
	state,
	mutations,
	getters
}