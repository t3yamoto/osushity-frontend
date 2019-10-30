export const state = () => ({
  sushiChains: []
})

export const getters = {
  sushiChains: (state) => state.sushiChains,
  getSushiChainById: (state) => (id) => {
    return state.sushiChains.find((sushiChain) => sushiChain.id === id)
  }
}

export const mutations = {
  addSushiChain(state, { sushiChain }) {
    state.sushiChains.push(sushiChain)
  },
  clearSushiChains(state) {
    state.sushiChains = []
  }
}

export const actions = {
  async fetchSushiChains({ commit }) {
    const sushiChains = await this.$axios.$get('/sushiChains')
    commit('clearSushiChains')
    sushiChains.forEach((sushiChain) => commit('addSushiChain', { sushiChain }))
  }
}
