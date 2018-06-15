const actions = {
  addGrid (context, value) {
    if(!context.state.gridsList.some(function(el) {
			return el === value;
		})) 
		{
    context.commit('addGrid', value);
    context.commit('changeCurrentGrid', value)
    }
  }
}

export default actions