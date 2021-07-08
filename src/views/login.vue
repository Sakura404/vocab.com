<template>
  <v-app
    ><v-card height="100%" class="bglogin">
      <router-view>
      </router-view></v-card
    >
  </v-app>
</template>
<script>
export default {
  data: () => ({
    length: 3,
    windowSize: {
      x: 0,
      y: 0,
    },
    onboarding: 0,
  }),

  mounted() {
    this.onResize();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
  },
};
</script>
<style >
.bglogin {
  background: rgb(84, 142, 72);
  background: linear-gradient(
    to left bottom,
    rgba(91, 144, 75, 0.904) 50%,
    rgb(91, 143, 79) 50%
  );
}
</style>