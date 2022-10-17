import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth";

// TODO: ここを自分のプロジェクトの設定に合わせて変更してください
// const config = {
//   apiKey: "FIREBASE_API_KEY",
//   authDomain: "FIREBASE_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "FIREBASE_STORAGE_BUCKET",
//   messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
//   appId: "FIREBASE_APP_ID",
//   measurementId: "FIREBASE_MEASUREMENT_ID",
// };

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  // ▼ これを指定すると、タブを閉じるとログアウトします ▼
  // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;
// 本来はここで inject することで、コンポーネントからはインスタンスとして呼び出されます
