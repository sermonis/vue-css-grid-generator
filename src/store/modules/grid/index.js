import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions'

Vue.use(Vuex);

const state = {
	currentGrid: 'root',
	root: {
		width: '820px',
		height: '640px',
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
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'},
		{fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'auto', alignSelf: 'auto'}
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