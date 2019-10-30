<template>
  <section class="section">
    <b-message title="ようこそ Osushityへ" type="is-info" size="is-small">
      食物アレルギーをお持ちの方が、安心して回転寿司で食事をすることをサポートする検索サイトです。<br />
      除去したいアレルゲンを指定して検索することで、食べられるネタのみを一覧表示することができます。一覧のネタを選択すると、そのネタに含まれるアレルゲンを確認することができます。<br />
      また、ネタの名前の一部を入力して検索することもできます。
    </b-message>
    <b-field label="お店を選ぶ">
      <multiselect
        v-model="sushiChain"
        :options="sushiChains"
        placeholder="お店を選んでください"
        track-by="id"
        label="name"
        :searchable="false"
        :allow-empty="false"
      />
    </b-field>
    <b-field label="除去したいアレルゲンを選ぶ">
      <multiselect
        v-model="excludeAllergens"
        :options="allergenOptions"
        :multiple="true"
        :taggable="true"
        group-values="allergens"
        group-label="category"
        placeholder="除去したいアレルゲンを選択してください"
        track-by="id"
        label="name"
        :searchable="false"
        :close-on-select="false"
      />
    </b-field>
    <b-field>
      <b-checkbox v-model="excludesMayContain" size="is-small">
        製造工程で混入する可能性がある場合も除去する
      </b-checkbox>
    </b-field>
    <b-field label="ネタの名前で絞り込む">
      <b-input v-model="nameLike" placeholder="例) まぐろ" type="search" />
    </b-field>
    <b-field grouped>
      <div class="control">
        <b-button
          type="is-primary"
          :icon-left="isLoading ? 'timer-sand' : 'magnify'"
          :disabled="isLoading"
          @click="search()"
        >
          検索
        </b-button>
      </div>
      <div class="control">
        <b-button type="is-light" :disabled="isLoading" @click="clear()">
          クリア
        </b-button>
      </div>
    </b-field>
    <hr />

    <h4 class="title is-4">
      検索結果
    </h4>
    <NetaCard
      v-for="info in allergyInformation"
      :key="info.name"
      :allergy-information="info"
      class="neta-card"
    />
    <infinite-loading
      spinner="spiral"
      :identifier="identifier"
      @infinite="infiniteHandler"
    >
      <div slot="no-more"></div>
      <div slot="no-results">
        該当するネタがありません。
      </div>
    </infinite-loading>
  </section>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { mapGetters, mapActions } from 'vuex'
import NetaCard from '~/components/NetaCard.vue'

export default {
  name: 'Index',
  components: {
    NetaCard,
    InfiniteLoading
  },
  data() {
    return {
      sushiChain: null,
      excludeAllergens: [],
      excludesMayContain: false,
      nameLike: '',

      isLoading: false,
      identifier: 0
    }
  },
  computed: {
    allergenOptions() {
      return [
        {
          category: '特定原材料',
          allergens: this.specificRawMaterials
        },
        {
          category: '特定原材料に準ずるもの',
          allergens: this.equivalentToSpecificRawMaterials
        }
      ]
    },
    ...mapGetters(['sushiChains', 'getSushiChainById']),
    ...mapGetters('allergyInformation', ['allergyInformation']),
    ...mapGetters('allergens', [
      'allergensFrom',
      'specificRawMaterials',
      'equivalentToSpecificRawMaterials'
    ])
  },
  watch: {
    $route(to, from) {
      const queryParams = this.$nuxt.$route.query
      this.parseQuery(queryParams)
      this.reset()
      this.identifier++
    }
  },
  async fetch({ store }) {
    await store.dispatch('fetchSushiChains')
  },
  created() {
    const queryParams = this.$nuxt.$route.query
    this.parseQuery(queryParams)
  },
  methods: {
    parseQuery({
      sushiChainId,
      excludeAllergens,
      excludesMayContain,
      nameLike
    }) {
      if (sushiChainId) {
        this.sushiChain = this.getSushiChainById(sushiChainId)
      } else {
        this.sushiChain = this.sushiChains[0]
      }
      if (excludeAllergens) {
        this.excludeAllergens = this.allergensFrom(excludeAllergens.split(','))
      } else {
        this.excludeAllergens = []
      }
      this.excludesMayContain = excludesMayContain === '1'
      this.nameLike = nameLike
    },
    search() {
      const param = {
        sushiChainId: this.sushiChain.id,
        excludesMayContain: this.excludesMayContain ? '1' : '0'
      }
      if (this.excludeAllergens) {
        param.excludeAllergens = this.excludeAllergens
          .map((allergen) => allergen.id)
          .join(',')
      }
      if (this.nameLike) {
        param.nameLike = this.nameLike
      }
      this.$nuxt.$router.push({
        path: '/',
        query: param
      })
    },
    clear() {
      this.$nuxt.$router.push({
        path: '/',
        query: {
          sushiChainId: this.sushiChain.id
        }
      })
    },
    async infiniteHandler($state) {
      try {
        this.isLoading = true
        const hasNext = await this.fetchAllergyInformation({
          sushiChain: this.sushiChain,
          excludeAllergens: this.excludeAllergens,
          excludesMayContain: this.excludesMayContain,
          nameLike: this.nameLike
        })
        if (hasNext) {
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      } finally {
        this.isLoading = false
      }
    },
    ...mapActions('allergyInformation', ['fetchAllergyInformation', 'reset'])
  }
}
</script>

<style scoped>
.neta-card + .neta-card {
  margin-top: 8px;
}
</style>
