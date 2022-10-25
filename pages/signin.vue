<template>
  <div class="main">
    <h1 class="h1">ログイン</h1>
    <div class="mt48">
      <div class="mt24 form_row">
        <label class="label" for="mail">メールアドレス</label>
        <input class="input" id="mail" type="text" v-model="userMail" />
      </div>
      <div class="mt24 form_row">
        <label class="label" for="passwd">パスワード</label>
        <input class="input" id="passwd" type="text" v-model="userPass" />
      </div>
    </div>
    <div class="mt48">
      <button
        class="btn btn--blue"
        @click="login"
        :disabled="!(userMail && userPass)"
      >
        ログイン
      </button>
    </div>
    <div class="mt48">
      <p class="note">
        まだアカウントをお持ちでない方は<nuxt-link to="signup"
          >こちら</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      userMail: "",
      userPass: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.userMail, this.userPass)
        .then(() => {
          this.$router.push("/");
          this.userMail = "";
          this.userPass = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          alert("error:" + errorCode);
        });
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 96px;
  width: 480px;
}
.label {
  display: block;
  float: left;
  width: 96px;
  margin-right: 24px;
}
.input {
  width: 360px;
}
.btn {
  width: 240px;
  margin: 0 auto;
}
.note {
  text-align: center;
}
a {
  color: var(--blue1);
}
@media screen and (max-width: 480px) {
  .main {
    width: calc(100% - 16px * 2);
    margin-top: 36px;
  }
  .input {
    width: 223px;
  }
}
</style>