<template>
  <div class="main">
    <h1 class="h1">アカウント登録</h1>
    <div class="mt48">
      <div class="mt24 form_row">
        <label class="label" for="mail">メールアドレス</label>
        <input class="input" id="mail" type="text" />
      </div>
      <div class="mt24 form_row">
        <label class="label" for="passwd">パスワード</label>
        <input class="input" id="passwd" type="text" />
      </div>
      <div class="mt24 form_row">
        <label class="label" for="name">名前</label>
        <input class="input" id="name" type="text" />
      </div>
    </div>
    <div class="mt48">
      <button class="btn btn--blue">アカウント登録</button>
    </div>
    <div class="mt48">
      <p class="note">既にアカウントをお持ちの方は<a href="">こちら</a></p>
    </div>
  </div>
</template>

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