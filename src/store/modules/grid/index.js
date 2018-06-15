import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions'

Vue.use(Vuex);

const state = {
	currentGrid: 'root',
	zoom: '1',
	gridsList: ['root', 'none'],
	root: {
		width: '820px',
		height: '100%',
		columns: 3,
		rows: 3,
		columnsGap: '0',
		rowsGap: '0',
		itemsCount: 5,
		gridAutoFlow: 'row',
		justifyContent: 'start',
		alignContent: 'start',
		justifyItems: 'stretch',
		alignItems: 'stretch',
		templateColumns: ['1fr', '1fr', '1fr'],
		templateRows: ['1fr', '1fr', '1fr'],
		selectedItem: 0,
		items: [
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto', subGrid: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto', subGrid: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto', subGrid: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto', subGrid: 'none'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto', subGrid: 'none'}
		]
	},
}
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
}