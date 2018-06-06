import Vue from 'vue';
import Vuex from 'vuex';
import grid from './modules/grid'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		grid
	}
})

export default store;