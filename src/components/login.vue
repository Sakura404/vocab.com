<template>
  <div>
    <v-window v-model="onboarding">
      <v-window-item v-for="n in length" :key="`card-${n}`">
        <v-card color="transparent " :height="windowSize.y - 100">
          <v-row class="fill-height" align="center" justify="center">
            <v-card-text style="color: white" class="text-center">
              <v-img
                class="mx-auto"
                src="../assets/splash-logo_01.png"
                :aspect-ratio="1 / 1"
                width="30%"
              ></v-img>
              <p class="text-h5 font-weight-thin">Welcome to Vocabulary.com</p>
              <p class="text-h font-weight-thin">
                Look up a word. Learn it forever.
              </p>
              <p class="font-weight-thin">
                Vocabulary.com combines the world's smartest <br />
                dictionary with an adaptive learning game that will <br />
                have you mastering new words in no time.
              </p>
              <p class="font-weight-thin">Swipe to learn more.</p>
            </v-card-text>
          </v-row>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      .
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in length"
          :key="`btn-${n}`"
          v-slot="{ active, toggle }"
        >
          <v-btn active-class="w" :input-value="active" icon @click="toggle">
            <v-icon dense color="rgba(255,255,255,0.5)">mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
      .
    </v-card-actions>
    <v-row justify="center" no-gutters
      ><v-col cols="4"
        ><v-btn dark to="login/signin" color="green">Sign In</v-btn> </v-col
      ><v-col cols="3"><v-btn dark to="login/signup" color="green">Sign Up</v-btn></v-col></v-row
    >
  </div>
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