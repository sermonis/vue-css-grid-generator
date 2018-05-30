import Vue from 'vue';
import Vuex from 'vuex';
import grids from './modules/grids'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		grids
	}
})

export default store;