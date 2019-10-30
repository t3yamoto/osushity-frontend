<template>
  <section>
    <b-collapse :open="false" class="card" aria-id="contentIdForA11y3">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3"
      >
        <p class="card-header-title">
          {{ allergyInformation.name }}
        </p>
        <a class="card-header-icon">
          <b-icon
            type="is-grey"
            :icon="props.open ? 'chevron-up' : 'chevron-down'"
          >
          </b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <p class="subtitle is-6">含まれるアレルゲン</p>
          <b-taglist v-if="containAllergens.length > 0">
            <b-tag
              v-for="allergen in containAllergens"
              :key="allergen.id"
              type="is-danger"
              size="is-small"
              >{{ allergen.name }}</b-tag
            >
          </b-taglist>
          <div v-else class="content is-small">
            該当なし
          </div>
          <p class="subtitle is-6">
            製造工程等で混入する可能性があるアレルゲン
          </p>
          <b-taglist v-if="mayContainAllergens.length > 0">
            <b-tag
              v-for="allergen in mayContainAllergens"
              :key="allergen.id"
              type="is-primary"
              size="is-small"
              >{{ allergen.name }}</b-tag
            >
          </b-taglist>
          <div v-else class="content is-small">
            該当なし
          </div>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    allergyInformation: {
      type: Object,
      required: true
    }
  },
  computed: {
    containAllergens() {
      return Object.entries(this.allergyInformation)
        .filter(([key, value]) => value === 'CONTAIN')
        .map(([key, value]) => this.allergenFrom(key))
    },
    mayContainAllergens() {
      return Object.entries(this.allergyInformation)
        .filter(([key, value]) => value === 'MAY_CONTAIN')
        .map(([key, value]) => this.allergenFrom(key))
    },
    ...mapGetters('allergens', ['allergenFrom'])
  }
}
</script>
