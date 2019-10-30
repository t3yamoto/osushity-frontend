<template>
  <div>
    <b-navbar id="nav" type="is-primary" :shadow="true" :close-on-click="true">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="~assets/osushity.png" alt="Osushity" />
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="router-link" :to="{ path: '/about' }">
          About
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="main-content">
      <div class="container w">
        <nuxt />
        <a v-if="position > 500" v-scroll-to="'#nav'" href="#" class="to-top">
          <b-icon icon="arrow-up-bold-circle" size="is-large" type="is-info">
          </b-icon>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: 0
    }
  },
  mounted() {
    if (!process.browser) return
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    handleScroll() {
      this.position = window.scrollY
    }
  }
}
</script>
<style scoped>
.w {
  max-width: 768px;
}
.to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
