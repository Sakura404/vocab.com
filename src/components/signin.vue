<template>
  <div>
    <v-toolbar flat color="rgba(255, 255, 255,0.1)"
      ><v-spacer></v-spacer
      ><v-btn @click="backas()" class="font-weight-light" dark text>
        back <v-icon>mdi-chevron-right</v-icon></v-btn
      ></v-toolbar
    >
    <v-card-text
      ><v-row justify="center" no-gutters
        ><h1 class="white--text font-weight-light text-center">
          Sign In to Vocabulary.com
        </h1></v-row
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
        ><v-card color="rgba(231,238,229)" width="90%">
          <v-card-text>
            <v-form ref="login"
              >username or email address
              <v-text-field
                v-model="user"
                :rules="namerules"
                flat
                solo
              ></v-text-field
              >password<a
                href="#"
                style="color: green; text-decoration: none"
                class="float-right"
                >Forgot your password?</a
              >
              <v-text-field
                v-model="psw"
                flat
                solo
                type="password"
                :rules="pswrules"
              ></v-text-field>
              <v-btn @click="submit" block dark color="green"
                >sign in</v-btn
              ></v-form
            ></v-card-text
          ></v-card
        ></v-row
      >
      <v-row class="mt-6 white--text" justify="center"
        ><h3 class="font-weight-thin">
          Don't have an account yet? No problem!
        </h3>
        <h3 class="font-weight-thin">
          It's free and takes 10 seconds to sign up!
        </h3>
      </v-row>
      <v-row justify="center"
        ><v-btn width="35%" class="mt-4" color="green" dark x-large
          >sign up</v-btn
        ></v-row
      >
    </v-card-text>
  </div>
</template>
<script>
export default {
  data: () => ({
    psw: null,
    user: null,
    namerules: [(v) => !!v || "名字不能为空"],
    pswrules: [(v) => !!v || "密码不能为空"],
  }),
  methods: {
    submit() {
      if (this.$refs.login.validate()) this.login();
    },
    backas() {
      this.$router.push("/login");
    },
    login() {
      if (this.psw == 123456 && this.user == "380487608@qq.com") {
        sessionStorage.setItem("userId", this.user);
        alert("登陆成功");
        if (this.$route.query.redirect) {
          this.$router.push("index");
        } else {
          this.$router.push("/");
        }
      } else {
        alert("登陆失败");
      }
    },
  },
};
</script>