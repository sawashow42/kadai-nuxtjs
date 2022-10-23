<template>
  <div class="main">
    <h1 class="h1">アカウント登録</h1>
    <div class="mt48">
      <div class="mt24 form_row">
        <label class="label" for="mail">メールアドレス</label>
        <input class="input" id="mail" type="text" v-model="userMail" />
      </div>
      <div class="mt24 form_row">
        <label class="label" for="passwd">パスワード</label>
        <input class="input" id="passwd" type="text" v-model="userPass" />
      </div>
      <div class="mt24 form_row">
        <label class="label" for="name">名前</label>
        <input class="input" id="name" type="text" v-model="userName" />
      </div>
    </div>
    <div class="mt48">
      <button
        class="btn btn--blue"
        @click="createUser"
        :disabled="!(userMail && userPass && userName)"
      >
        アカウント登録
      </button>
    </div>
    <div class="mt48">
      <p class="note">
        既にアカウントをお持ちの方は<nuxt-link to="signin">こちら</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export default {
  data() {
    return {
      userMail: "",
      userName: "",
      userPass: "",
    };
  },
  methods: {
    createUser() {
      if (
        this.userMail === "" ||
        this.userName === "" ||
        this.userPass === ""
      ) {
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.userMail, this.userPass)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          console.log(uid);
          db.collection("users").doc(uid).set({
            name: this.userName,
          });
          this.userMail = "";
          this.userName = "";
          this.userPass = "";
        })
        .catch((error) => {
          let errorCode = error.code;
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