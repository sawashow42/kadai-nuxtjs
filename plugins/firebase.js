import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// TODO: ここを自分のプロジェクトの設定に合わせて変更してください
const config = {
  apiKey: "AIzaSyByon7HyiMzYlpoh8629UzWOC6HAwMWVjg",
  authDomain: "nuxt-todo-eed90.firebaseapp.com",
  databaseURL: "https://nuxt-todo-eed90-default-rtdb.firebaseio.com",
  projectId: "nuxt-todo-eed90",
  storageBucket: "nuxt-todo-eed90.appspot.com",
  messagingSenderId: "602724239045",
  appId: "1:602724239045:web:edc42b5d071cfac34892ac",
  measurementId: "G-9Y1DLGHCCX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  // ▼ これを指定すると、タブを閉じるとログアウトします ▼
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;
// 本来はここで inject することで、コンポーネントからはインスタンスとして呼び出されます
