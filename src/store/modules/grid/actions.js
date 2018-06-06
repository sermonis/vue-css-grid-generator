const actions = {
  addGrid (context, value) {
    context.commit('addGrid', value);
    context.commit('changeCurrentGrid', value)
  }
}

export default actions