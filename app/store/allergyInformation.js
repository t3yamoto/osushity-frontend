export const state = () => ({
  page: 0,

  allergyInformation: []
})

export const getters = {
  limit: (state) => 50,
  page: (state) => state.page,

  allergyInformation: (state) => state.allergyInformation
}

export const mutations = {
  addAllergyInformation(state, { item }) {
    state.allergyInformation.push(item)
  },
  clearAllergyInformation(state) {
    state.allergyInformation = []
  },
  nextPage(state) {
    state.page++
  },
  initPage(state) {
    state.page = 0
  }
}

export const actions = {
  async fetchAllergyInformation(
    { commit, getters },
    { sushiChain, excludeAllergens, excludesMayContain, nameLike }
  ) {
    commit('nextPage')
    const allergyInformation = await this.$axios.$get(
      `/sushiChains/${sushiChain.id}/allergyInformation`,
      {
        params: {
          excludeAllergens: excludeAllergens.map((e) => e.id).join(','),
          excludesMayContain: excludesMayContain ? '1' : '0',
          nameLike,
          limit: getters.limit,
          page: getters.page
        }
      }
    )
    allergyInformation.forEach((item) =>
      commit('addAllergyInformation', { item })
    )
    return allergyInformation.length > 0
  },
  reset({ commit, getters }) {
    commit('initPage')
    commit('clearAllergyInformation')
  }
}
