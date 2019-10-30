export const state = () => ({
  allergens: [
    {
      id: 'egg',
      name: '卵',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'milk',
      name: '乳',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'wheat',
      name: '小麦',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'buckwheat',
      name: 'そば',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'peanut',
      name: '落花生',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'shrimp',
      name: 'えび',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'crab',
      name: 'かに',
      category: 'SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'abalone',
      name: 'あわび',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'squid',
      name: 'いか',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'salmonRoe',
      name: 'いくら',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'orange',
      name: 'オレンジ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'kiwi',
      name: 'キウイフルーツ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'beef',
      name: '牛肉',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'walnut',
      name: 'くるみ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'salmon',
      name: 'さけ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'mackerel',
      name: 'さば',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'soybean',
      name: '大豆',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'chicken',
      name: '鶏肉',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'pork',
      name: '豚肉',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'matsutakeMushroom',
      name: 'まつたけ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'peach',
      name: 'もも',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'yamOrSweetPotato',
      name: 'やまいも',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'apple',
      name: 'りんご',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'gelatin',
      name: 'ゼラチン',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'banana',
      name: 'バナナ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'sesame',
      name: 'ごま',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    },
    {
      id: 'cashewNut',
      name: 'カシューナッツ',
      category: 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    }
  ]
})

export const getters = {
  allergens: (state) => state.allergens,
  allergenFrom: (state) => (id) => {
    return state.allergens.find((allergen) => allergen.id === id)
  },
  allergensFrom: (state) => (ids) => {
    return ids
      .filter((id) => state.allergens.some((allergen) => allergen.id === id))
      .map((id) => state.allergens.find((allergen) => allergen.id === id))
  },
  specificRawMaterials: (state) =>
    state.allergens.filter(
      (allergen) => allergen.category === 'SPECIFIC_RAW_MATERIAL'
    ),
  equivalentToSpecificRawMaterials: (state) =>
    state.allergens.filter(
      (allergen) => allergen.category === 'EQUIVALENT_TO_SPECIFIC_RAW_MATERIAL'
    )
}
