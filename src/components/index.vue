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
            <div class="text-right text-caption">{{ username }}</div></v-col
          ><v-col cols="2"
            ><v-img
              width="50px"
              height="60px"
              src="../assets/images/levels_07.png"
            ></v-img></v-col
        ></v-row>

        <template v-slot:extension>
          <v-tabs @change="lookup()" grow v-model="tab" color="black">
            <v-tab key="play" active-class="actived"
              ><v-img
                class="mr-1"
                v-if="tab == 0"
                max-width="16px"
                max-height="16px"
                aspect-ratio="1"
                src="../assets/header/play-on.png"
              ></v-img>
              <v-img
                class="mr-1"
                v-else
                max-width="16px"
                height="16px"
                aspect-ratio="1"
                src="../assets/header/play-off.png"
              ></v-img>
              play</v-tab
            >
            <v-tab key="look up">
              <img
                class="mr-1"
                v-if="tab != 1"
                width="16px"
                height="16px"
                aspect-ratio="1"
                src="../assets/header/dict-off.png" />
              <img
                class="mr-1"
                v-else
                width="16px"
                height="16px"
                aspect-ratio="1"
                src="../assets/header/dict-on.png" />
              <v-expand-x-transition>
                <span v-if="!lk"> look up </span>

                <div class="se" v-else>
                  <input
                    v-model="lookupinput"
                    placeholder="Look Up"
                    class="mt-2 tabsearch"
                    label="look up"
                  /></div></v-expand-x-transition
            ></v-tab>
            <v-tab key="lists"
              ><img
                class="mr-1"
                v-if="tab != 2"
                width="16px"
                height="16px"
                aspect-ratio="1"
                src="../assets/header/lists-off.png"
              />
              <img
                class="mr-1"
                v-else
                width="16px"
                height="16px"
                aspect-ratio="1"
                src="../assets/header/lists-on.png"
              />
              lists</v-tab
            >
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
                    :value="trophyprogress"
                    >{{ trophyprogress }}%</v-progress-circular
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
            <v-slide-y-transition>
              <v-sheet class="px-3 pb-16" v-if="!asearch"
                ><p class="text-h2">
                  ambulance <v-icon x-large c>mdi-volume-source</v-icon>
                </p>
                <p class="text-h5">
                  An <span class="green--text">ambulance</span> is an emergency
                  vehicle thattransports people to the hospital in emergencies.
                  If you see that someone's beeninjured in a car accident, it's
                  a good idea to callan ambulance.
                </p>
                <p>
                  People who are terribly sick, or who are unexpectedly hurt
                  orinjured, often need to get to a hospital quickly, and this
                  is what anambulance is for.As the patient is driven to a
                  hospital, with theambulance's lights flashing and siren
                  sounding, he or she is oftentreated by an emergency medical
                  technician.The word comes fromthe French phrase hopital
                  ambulant, or "walking hospital," from theLatin ambulare, "to
                  walk."
                </p>
                <p class="mb-0 text-button">definitions of:</p>
                <h1>ambulance</h1>
                <v-img class="mb-5" src="../assets/1.png"></v-img>
                <p class="text-button">WORD FAMILY</p>
                <v-img class="mb-5" src="../assets/2.png"></v-img>
                <p class="text-button">usage examples</p>
                <p class="mb-0">
                  About 10 people were injured and taken to hospitals by
                  <span class="font-weight-black">ambulance</span>,saidbase
                  spokesman Scott Bassett.
                </p>
                <p class="text-caption grey--text">Fox News Jul 8, 2021</p>
                <p class="mb-0">
                  An <span class="font-weight-black">ambulance</span> took him
                  to the trauma unit at St Mary's Hospital in Paddington where
                  surgeons successfully managed to save his leg.
                </p>
                <p class="text-caption grey--text">BBC Jul 8, 2021</p>
                <p class="mb-0">
                  Hours after Cameron Melius, 26, was released from a Virginia
                  jail inOctober, he was taken by
                  <span class="font-weight-black">ambulance</span> to a
                  hospital, where he died.
                </p>
                <p class="text-caption grey--text">New York Times Jul 7,2021</p>
                <p class="mb-0">
                  He looked groggy as he was tended to by the race medical team
                  before hewas stretchered off into an
                  <span class="font-weight-black">ambulance</span>.
                </p>
                <p class="text-caption grey--text">Seattle Times Jul 7,2021</p>
                <p class="text-right">
                  <v-btn text color=" blue">
                    next <v-icon>mdi-chevron-right</v-icon></v-btn
                  >
                </p>
                <v-divider></v-divider>
                <v-icon @click="ambulancefooterswitch = !ambulancefooterswitch"
                  >mdi-chevron-down</v-icon
                >
                All Sources
                <v-divider></v-divider>
                <div v-if="ambulancefooterswitch">
                  <p
                    class="my-1 brown--text"
                    v-for="(a, i) in ambulancefooter"
                    :key="i"
                  >
                    <span class="mx-7"> {{ a }}</span>
                    <v-divider></v-divider>
                  </p>
                </div>
              </v-sheet>
            </v-slide-y-transition>
          </v-card>
        </v-tab-item>
        <v-tab-item key="lists"
          ><v-card tile class="indexbg" :min-height="windowSize.y - 104" flat>
            <v-sheet class="px-5">
              <div class="mt-4 se">
                <v-icon> mdi-magnify</v-icon>
                <input type="text" style="color: black" class="listsearch" />
              </div>
              <v-divider></v-divider>
              <h1>Featured Lists</h1>
              <p class="grey--text">
                Great lists from the Vocabulary.com community.
              </p>
              <p class="font-weight-black">Test prep</p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                Essential Academic Vocabulary for Middle School Students,List 1
              </p>
              <p class="font-weight-light">
                whether you're hoping to improve your comprehension of reading
                assignments or simply looking to increase your word
                knowledge,our lists of essential, high-frequency words will put
                you on thepath to...
              </p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                Essential Academic Vocabulary for Middle School Students,List 1
              </p>
              <p class="font-weight-light">
                Whether you're preparing for a standardized test, hoping to
                improve your comprehension of reading assignments, or simply
                looking to increase your word knowledge, our lists of
                essential,high-frequency...
              </p>
              <p class="font-weight-black">Literature</p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                "The Hill We Climb," by Amanda Gorman
              </p>
              <p class="font-weight-light">
                22-year-old Amanda Gorman became the youngest inaugural poetin
                American history when she read her poem "The Hill we Climb"at
                President Biden's inauguration on January 20, 2021.The poem
                conveys both...
              </p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                "The Overcoat" by Nikolai Gogol
              </p>
              <p class="font-weight-light">
                ln this classic Russian short story, a low-level bureaucrat's
                life is upended when he attempts to purchase a new
                overcoat.Learnthese words from the translation by Richard Pevear
                and Larissa...
              </p>
              <p class="font-weight-black">Morphology & Roots</p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                ln the Know: Cogn, Conn
              </p>
              <p class="font-weight-light">
                Knowledge is power, so learn these words that derive from
                theLatin roots cogn and conn, meaning "know,learn."
              </p>
              <p class="mb-0 font-weight-light blue-grey--text text-h5">
                Perfect Ten: Dec, Cent,Mille
              </p>
              <p class="font-weight-light">
                These words derive from the Latin roots dec ("ten"), cent
                ("hundred"), and mille ("thousand"). Start a practice session
                andsee if you can score 100 percent!
              </p>
            </v-sheet>
          </v-card>
        </v-tab-item></v-tabs-items
      >

      <v-navigation-drawer color="rgb(60,58,61)" app v-model="nav">
        <v-card flat color="rgba(0,0,0,.0)">
          <v-card-text>
            <v-row
              ><v-col cols="4"
                ><v-img
                  height="60px"
                  src="../assets/images/levels_07.png"
                ></v-img></v-col
              ><v-col class="white--text"
                ><div class="text-h6">{{ username }}</div>
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
          <v-list-item
            ><v-img
              class="mr-2"
              max-width="32px"
              src="../assets/icons/menu-buttons_01.png"
            ></v-img>
            Find a List to Learn...</v-list-item
          >
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
          <v-list-item @click="logout()">Log Out</v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lookupinput: null,
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
      trophyprogress: 40,
      trophypoints: 100,
      ambulancefooterswitch: false,
      ambulancefooter: [
        "Fiction",
        "Arts/Culture",
        "News",
        "Business",
        "Sports",
        "Science/Medicine",
        "Technology",
      ],
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
    username() {
      return window.sessionStorage.getItem("userId");
    },
    asearch() {
      if (this.lookupinput == "") return true;
      console.log(this.lookupinput);
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
        this.trophyprogress += (this.trophypoints / 10) * 2;
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
    logout() {
      window.sessionStorage.removeItem("userId");
      this.$router.push("/login");
    },
    check() {},
  },
};
</script>
<style >
.tabsearch {
  width: 90%;
  height: 100%;
  outline: none;
  border-bottom: black solid 1px;
  color: white;
}
.listsearch {
  width: 100%;
  height: 100%;
  outline: none;
  color: black;
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