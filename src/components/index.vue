<template>
  <div id="app">
    <v-app>
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
        <v-row no-gutters>
          <v-col cols="5"></v-col>
          <v-spacer></v-spacer>

          <v-col cols="5">
            <div class="text-right text-h4">28.238</div>
            <div class="text-right text-caption">nameless N.</div></v-col
          ><v-col cols="2"
            ><v-icon x-large color="green">mdi-lightning-bolt</v-icon></v-col
          ></v-row
        >

        <template v-slot:extension>
          <v-tabs @change="lookup()" grow v-model="tab" color="black">
            <v-tab key="play" active-class="actived"> play</v-tab>
            <v-tab key="look up">
              <v-expand-x-transition v-if="!lk">
                <span>look up</span></v-expand-x-transition
              >
              <v-expand-x-transition v-else>
                <div class="se">
                  <v-icon color="green">mdi-magnify</v-icon>
                  <input
                    placeholder="Look Up"
                    class="tabsearch"
                    label="look up"
                  /></div></v-expand-x-transition
            ></v-tab>
            <v-tab key="lists"> lists</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item key="play">
          <v-card tile class="indexbg" :min-height="windowSize.y - 104" flat>
            <v-card-text>
              <v-card>
                <v-card-text>
                  <h2>trophy means:</h2>
                  <v-radio-group v-model="trophyanswer">
                    <v-radio
                      v-for="(n, i) in trophy"
                      :key="i"
                      :label="n.sentence"
                      :value="i"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>
            </v-card-text>

            <v-sheet class="progress px-2 py-2"
              ><v-row class="px-2 py-2">
                <v-col>
                  <v-progress-circular color="green" :rotate="270" :value="40"
                    >40</v-progress-circular
                  >
                </v-col>
              </v-row></v-sheet
            >
          </v-card>
        </v-tab-item>
        <v-tab-item key="lookup">
          <v-card tile class="lookbg" :min-height="windowSize.y - 104" flat>
          </v-card></v-tab-item
      ></v-tabs-items>

      <v-navigation-drawer color="rgb(60,58,61)" width="70%" app v-model="nav">
        <v-card flat color="rgba(0,0,0,.0)">
          <v-card-text>
            <v-row
              ><v-col cols="4"
                ><v-icon x-large color="green"
                  >mdi-lightning-bolt</v-icon
                ></v-col
              ><v-col class="white--text"
                ><div class="text-h6">nameless N.</div>
                <div>phenom</div></v-col
              ></v-row
            >
          </v-card-text></v-card
        >
        <v-list
          class="font-weight-thin"
          dark
          style="color: rgba(255, 255, 255, 0.7)"
        >
          <v-subheader
            style="
              color: rgba(255, 255, 255, 0.7);
              background-color: rgba(255, 255, 255, 0.1);
            "
            >MY LISTS</v-subheader
          >
          <v-list-item class="g">
            <v-img
              class="mr-2"
              max-width="32px"
              src="../assets/icons/menu-buttons_02.png"
            ></v-img>
            Words I'm Learning
          </v-list-item>
          <v-list-item>
            <v-img
              class="mr-2"
              max-width="32px"
              src="../assets/icons/menu-buttons_02.png"
            ></v-img>
            Words i've Mastered</v-list-item
          >
          <v-list-item>
            <v-img
              class="mr-2"
              max-width="32px"
              src="../assets/icons/menu-buttons_02.png"
            ></v-img>
            Words i've Played</v-list-item
          >
          <v-divider dark></v-divider>
          <v-list-item> Find a List to Learn...</v-list-item>
          <v-subheader
            style="
              color: rgba(255, 255, 255, 0.7);
              background-color: rgba(255, 255, 255, 0.1);
            "
            >LEADERBOARDS</v-subheader
          >
          <v-list-item>Today</v-list-item>
          <v-list-item>Yesterday</v-list-item>
          <v-list-item>This Month</v-list-item>
          <v-list-item>Last Month</v-list-item>
          <v-divider dark></v-divider>
          <v-list-item>My Achievements</v-list-item>
          <v-list-item>Submit Feedback</v-list-item>
          <v-list-item>Rate this app</v-list-item>
          <v-list-item>Log Out</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trophyanswer: null,
      lk: false,
      nav: false,
      tab: null,
      windowSize: {
        x: 0,
        y: 0,
      },
      trophy: [
        { sentence: "a message that makes a pledge" },
        { sentence: "a subtle difference in meaning or opinion or attitude" },
        { sentence: "loud and persistent outcry from many people" },
        { sentence: "something given as a token of victory" },
      ],
      items: [
        { item: "play", content: "asdf" },
        { item: "look up", content: "asdf" },
        { item: "lists", content: "asdf" },
      ],
    };
  },
  computed: {
    inputwidth() {
      return { width: document.body.clientWidth / 3 };
    },
  },
  mounted() {
    this.onResize();
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    lookup() {
      console.log(this.tab);
      if (this.tab == 1) {
        this.lk = true;
      } else {
        this.lk = false;
      }
    },
  },
};
</script>
<style >
.tabsearch {
  width: 100%;
  height: 100%;
  outline: none;
  color: white;
}
.progress {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
.se {
  display: inline-flex;
}
.indexbg {
  background: linear-gradient(
    to left bottom,
    rgba(91, 144, 75, 0.904) 50%,
    rgb(91, 143, 79) 50%
  );
}
.lookbg {
  background: linear-gradient(
    to left bottom,
    rgba(47, 79, 105, 0.904) 50%,
    rgb(16, 78, 106) 50%
  );
}
</style>