<template>
  <v-app>
    <Header />

    <v-main>
      <component :is="layout">
        <router-view />
      </component>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

import Header from '@/components/Header'
import EmptyLayout from "@/layouts/EmptyLayout"
import MainLayout from "@/layouts/MainLayout"

export default {
  name: 'App',

  components: {
    EmptyLayout,
    MainLayout,
    Header
  },

  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "-layout"
    },

    err() {
      return this.$store.getters.error
    }
  },

  mounted() {
    this.resize(this);
    let vs = this;
    window.addEventListener("resize", () => {
      this.resize(vs);
    });
  },
  methods: {
    ...mapActions(['DESKTOP','MOBILE', 'CLEAR_ERROR']),

    resize(vs) {
      if (window.innerWidth <= 768) {
        vs.MOBILE();
      } else {
        vs.DESKTOP();
      }
    }
  },

  watch: {
    err(err) {
      if (this.$store.getters.error) {
        this.$error(err)
        this.CLEAR_ERROR()
      }
    }
  },
};
</script>

<style lang="scss">
  #app {
    background-color: $background;
  }

  .toasted.success, 
  .toasted.error {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
  }

  .invalid {
    border-color: red !important;
    color: red !important;
    animation: tremor 0.2s;
    transform: translate3d(0, 0, 0);
  }

  @keyframes tremor {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
