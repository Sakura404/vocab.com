<template>
  <div>
    <v-toolbar flat color="rgba(255, 255, 255,0.1)"
      ><v-btn @click="backas()" class="font-weight-light" dark text>
        <v-icon>mdi-chevron-left</v-icon> back </v-btn
      ><v-spacer></v-spacer
    ></v-toolbar>
    <v-card-text
      ><v-row justify="center" no-gutters
        ><h2 class="white--text font-weight-thin text-center">
          You're just a few seconds away from improving your vocabulary.
        </h2></v-row
      >

      <v-row justify="center">
        <v-col cols="8"
          ><v-btn raised class="font-weight-regular" x-large color="primary"
            >Sign in with Facebook</v-btn
          ></v-col
        ></v-row
      >
      <v-row class="white--text" justify="center"> or</v-row>
      <v-row justify="center"
        ><v-card color="rgba(231,238,229)" width="90%"
          ><v-card-text>
            BIRTH DATE
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              solo
            ></v-text-field>
            EMAIL ADDRESS
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              type="email"
              solo
            ></v-text-field>
            FIRST NAME
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              solo
            ></v-text-field>
            LAST NAME
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              solo
            ></v-text-field>
            PASSWORD
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              type="password"
              solo
            ></v-text-field>
            CONFIRM PASSWORD
            <v-text-field
              v-model="user"
              :rules="namerules"
              flat
              solo
            ></v-text-field>
            ARE YOU A HUMAN? TYOE THE WORD BELOW:
            <v-img src="../assets/humancheck.png"></v-img>

            <div>
              <span class="green--text"
                ><v-icon x-small>mdi-volume-source</v-icon> play Word </span
              ><span style="float: right" class="green--text"
                >Get A New Word</span
              >
            </div>
            <v-text-field
              class="mt-2"
              label="enter the word pictured above"
              v-model="user"
              :rules="namerules"
              flat
              solo
            ></v-text-field>
            By creating an account you agree to our
            <a href="" class="green--text">Terms of Use</a>
            <v-btn block dark color=" green" x-large>Create Your Login</v-btn>
          </v-card-text></v-card
        ></v-row
      ></v-card-text
    >
  </div>
</template>
<script>
export default {
  methods: {
    backas() {
      this.$router.push("/login");
    },
  },
};
</script>