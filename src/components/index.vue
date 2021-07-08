<template>
  <div id="app">
    <v-app>
      <v-toolbar flat dark color="blue-grey darken-2">
        <v-app-bar-nav-icon @click="nav = !nav"></v-app-bar-nav-icon>
        <v-row no-gutters>
          <v-col cols="5"></v-col>
          <v-spacer></v-spacer>

          <v-col cols="5">
            <div class="text-right text-h4">{{ toThousands(userpoint) }}</div>
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
                    v-model="lookupinput"
                    placeholder="Look Up"
                    class="tabsearch"
                    label="look up"
                  /></div></v-expand-x-transition
            ></v-tab>
            <v-tab key="lists"> lists</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items touchless v-model="tab">
        <v-tab-item key="play">
          <v-card tile class="indexbg" :min-height="windowSize.y - 104" flat>
            <v-card-text>
              <v-window :touchless="!nextswitch" v-model="playwin">
                <v-window-item key="1">
                  <v-card>
                    <v-card-text>
                      <h2>trophy means:</h2>
                      <v-radio-group
                        @change="trophycheck(trophyanswer)"
                        v-model="trophyanswer"
                      >
                        <v-radio
                          v-for="(n, i) in trophy"
                          color="green"
                          :key="i"
                          :value="i"
                          :disabled="n.havaselect"
                          :offIcon="n.icon"
                        >
                          <template v-slot:label>
                            <div :class="n.color" class="font-weight-bold">
                              {{ n.sentence }}
                            </div>
                          </template></v-radio
                        >
                      </v-radio-group>
                    </v-card-text>
                  </v-card>
                  <div class="mx-4 text-caption white--text text-right">
                    progress: {{ trophypoints }} Points
                  </div>
                </v-window-item>

                <v-window-item class="white--text" key="2"
                  ><div style="height: 100%">
                    <p class="px-2 text-h6 font-weight-light">
                      A trophy is a prize given for winning acompetition. Often
                      made of metal (orplastic meant to look like metal), a
                      trophymay not have much monetary value, butthe pride it
                      gives the person who receivesit can be priceless.
                    </p>
                    <p class="px-2 text-body-1 font-weight-light">
                      Trophy comes from the Greek word trope, meaning "aturning,
                      defeat of the enemy." It later came to mean "amonument of
                      victory," which it still celebrates today.Think of the
                      overjoyed actor who holds his Oscar -a trophy- in the air
                      during his acceptance speech, or ateam of eight year old
                      soccer players who, in their groupphoto, hold their
                      trophies in one hand while raising theindex finger of
                      their other hand, meaning "We're number one!"
                    </p>
                  </div>
                </v-window-item>
              </v-window>
            </v-card-text>
            <v-slide-x-reverse-transition>
              <v-btn
                v-if="nextswitch"
                @click="playwinnext()"
                style="top: 40%; right: -20px"
                fixed
                fab
                ><v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-slide-x-reverse-transition>
            <v-sheet class="progress px-1 py-1"
              ><v-row align="center" no-gutters>
                <v-col cols="2">
                  <v-progress-circular
                    size="50"
                    color="green"
                    :rotate="270"
                    :value="40"
                    >40%</v-progress-circular
                  > </v-col
                ><v-col class="green--text" cols="4">
                  <div>Your progress on:</div>
                  <div class="font-weight-light text-h5">trophy</div> </v-col
                ><v-spacer> </v-spacer>
                <v-col cols="1"> <v-icon x-large>mdi-magnify</v-icon></v-col>
                <v-col class="mx-6" cols="1">
                  <v-icon x-large>mdi-volume-source</v-icon></v-col
                >
              </v-row></v-sheet
            >
          </v-card>
        </v-tab-item>
        <v-tab-item key="lookup">
          <v-card tile class="lookbg" :min-height="windowSize.y - 104" flat>
            <p v-if="asearch" class="pt-4 text-center white--text">
              Try the world's smartest, fastest dictionary.<br />
              Start typing a word and get instant results.
            </p>
            <v-sheet v-else> 22</v-sheet>
          </v-card>
        </v-tab-item></v-tabs-items
      >

      <v-navigation-drawer color="rgb(60,58,61)" app v-model="nav">
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
      lookupinput: "a",
      nextswitch: false,
      trophyanswer: null,
      lk: false,
      nav: false,
      tab: null,
      playwin: null,
      userpoint: 28238,
      windowSize: {
        x: 0,
        y: 0,
      },
      trophypoints: 100,
      trophy: [
        {
          sentence: "a message that makes a pledge",
          answer: false,
          havaselect: false,
          icon: "mdi-checkbox-blank-circle-outline",
          color: "blue--text",
        },
        {
          sentence: "a subtle difference in meaning or opinion or attitude",
          answer: false,
          havaselect: false,
          icon: "mdi-checkbox-blank-circle-outline",
          color: "blue--text",
        },
        {
          sentence: "loud and persistent outcry from many people",
          answer: false,
          havaselect: false,
          icon: "mdi-checkbox-blank-circle-outline",
          color: "blue--text",
        },
        {
          sentence: "something given as a token of victory",
          answer: true,
          havaselect: false,
          icon: "mdi-checkbox-blank-circle-outline",
          color: "blue--text",
        },
      ],
      items: [
        { item: "play", content: "asdf" },
        { item: "look up", content: "asdf" },
        { item: "lists", content: "asdf" },
      ],
    };
  },
  computed: {
    asearch() {
        if(this.lookupinput=='')
        return true
        console.log(this.lookupinput)
      return "ambulance".indexOf(this.lookupinput) != 0;
    },
    inputwidth() {
      return { width: document.body.clientWidth / 3 };
    },
  },
  mounted() {
    this.onResize();
  },

  methods: {
    playwinnext() {
      this.playwin += 1;
    },
    toThousands(num) {
      return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    trophycheck(num) {
      if (!this.trophy[num].answer) {
        this.trophyanswer = null;
        console.log(this.trophy[num].answer);
        this.$set(this.trophy[num], "havaselect", true);
        this.trophy[num].havaselect = true;
        this.trophy[num].color = "red--text";
        this.trophy[num].icon = "mdi-close-circle";
        this.trophypoints =
          this.trophypoints - 40 > 0 ? this.trophypoints - 40 : 0;
      } else {
        this.trophy[num].havaselect = true;
        this.trophy[num].color = "green--text";
        this.trophyanswer = num;
        this.nextswitch = true;
        this.userpoint += this.trophypoints;
        this.trophy.forEach((element) => {
          element.havaselect = true;
          if (!element.answer) {
            element.color = "red--text";
            element.icon = "mdi-close-circle";
          }
        });
        this.$forceUpdate();
      }
    },
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
    check() {},
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
    rgba(72, 114, 59, 0.904) 50%,
    rgb(76, 119, 66) 50%
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