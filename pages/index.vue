<template>
  <div class="main">
    <div v-if="loading === true">
      <Loading />
    </div>
    <h1 class="h1">チュートリアルToDoリスト</h1>
    <div class="mt48">
      <h2 class="h2">ToDoリスト</h2>
      <div class="mt24 radio__wrapper">
        <label class="radio-label" for="radio-all">
          すべて
          <input
            class="radio-label__input"
            id="radio-all"
            type="radio"
            name="filter"
            v-model="filter"
            :value="null"
          />
          <span class="radio-label__span"></span>
        </label>
        <label class="radio-label" for="radio-not-done">
          未完了
          <input
            class="radio-label__input"
            id="radio-not-done"
            type="radio"
            name="filter"
            v-model="filter"
            :value="false"
          />
          <span class="radio-label__span"></span>
        </label>
        <label class="radio-label" for="radio-done">
          完了
          <input
            class="radio-label__input"
            id="radio-done"
            type="radio"
            name="filter"
            v-model="filter"
            :value="true"
          />
          <span class="radio-label__span"></span>
        </label>
        <p class="ml24">（{{ filteredTodos.length }}件）</p>
      </div>
      <div class="mt24">
        <div class="todo-list__header">
          <span class="is-done"></span>
          <p class="created-at">作成日時</p>
          <p class="note">メモ</p>
          <span class="delete"></span>
        </div>
        <p v-if="todos.length === 0" class="mt24">
          下から新しい作業を追加しましょう！
        </p>
        <ul v-else class="mt16">
          <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="mt16 todo__wrapper"
          >
            <label class="is-done checkbox-label" :for="`checkbox-${todo.id}`">
              <input
                class="checkbox-label__input"
                :id="`checkbox-${todo.id}`"
                type="checkbox"
                @change="updateTodo(todo)"
                v-model="todo.isDone"
              />
              <span class="checkbox-label__span"></span>
            </label>
            <p class="created-at">
              <span class="pc">{{ getOnlyYear(todo.createdAt) }}</span>
              <span>{{ getDateTimeExceptYear(todo.createdAt) }}</span>
            </p>
            <p class="note">{{ todo.note }}</p>
            <img
              class="delete"
              src="~/assets/image/trash.svg"
              alt="削除"
              @click="deleteTodo(todo.id)"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="mt48 add__wrapper">
      <h2 class="h2">新しい作業の追加</h2>
      <div class="mt24 form__row">
        <label class="label" for="new">メモ</label>
        <input
          class="input"
          id="new"
          type="text"
          placeholder="内容を入力してください"
          v-model="newLine"
        />
        <div class="ml24 btn__outer--small">
          <button class="btn btn--blue" @click="addToDo" :disabled="!newLine">
            追加
          </button>
        </div>
      </div>
    </div>
    <div class="mt48">
      <div class="logoutButton">
        <button class="btn btn--blue" @click="logout">ログアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "~/components/Loading.vue";
import firebase from "~/plugins/firebase";
const db = firebase.firestore();

export default {
  name: "IndexPage",
  components: { Loading },
  data() {
    return {
      filter: null,
      todos: [],
      newLine: "",
      loading: true,
    };
  },
  created() {
    db.collection("users")
      .doc("0")
      .collection("todos")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const padLeft = (num) => {
            return ("00" + num).slice(-2);
          };
          const docDate = doc.data().createdAt.toDate();
          const year = docDate.getFullYear();
          const month = padLeft(docDate.getMonth() + 1);
          const date = padLeft(docDate.getDate());
          const hour = padLeft(docDate.getHours());
          const min = padLeft(docDate.getMinutes());

          this.todos.push({
            id: doc.id,
            createdAt: `${year}/${month}/${date} ${hour}:${min}`,
            isDone: doc.data().isDone,
            note: doc.data().note,
          });
          this.loading = false;
        });
      });
  },
  computed: {
    filteredTodos() {
      if (this.filter === null) {
        return this.todos;
      } else {
        return this.todos.filter((todo) => todo.isDone === this.filter);
      }
    },
  },
  methods: {
    getOnlyYear(dateTime) {
      return dateTime.split("/")[0];
    },
    getDateTimeExceptYear(dateTime) {
      return dateTime.split("/").slice(1).join("/");
    },
    addToDo() {
      if (this.newLine === "") {
        return;
      }
      const now = new Date();
      const padLeft = (num) => {
        return ("00" + num).slice(-2);
      };
      const year = now.getFullYear();
      const month = padLeft(now.getMonth() + 1);
      const date = padLeft(now.getDate());
      const hour = padLeft(now.getHours());
      const min = padLeft(now.getMinutes());

      db.collection("users")
        .doc("0")
        .collection("todos")
        .doc(now.getTime().toString())
        .set({
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isDone: false,
          note: this.newLine,
        });
      this.todos.push({
        id: now.getTime().toString(),
        isDone: false,
        note: this.newLine,
        createdAt: `${year}/${month}/${date} ${hour}:${min}`,
      });
      this.newLine = "";
    },

    deleteTodo(id) {
      db.collection("users").doc("0").collection("todos").doc(id).delete();
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    updateTodo(todo) {
      db.collection("users").doc("0").collection("todos").doc(todo.id).update({
        isDone: todo.isDone,
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(console.log("Logout"))
        .catch(console.log("error"));
    },
  },
};
</script>

<style scoped>
.main {
  margin-top: 96px;
  width: 640px;
}

.radio__wrapper {
  display: flex;
  align-items: center;
}
.radio-label:not(:first-child) {
  margin-left: 24px;
}

.todo-list__header,
.todo__wrapper {
  display: flex;
  align-items: center;
}
.is-done {
  flex-shrink: 0;
  width: 21px;
  padding: 0;
}
.created-at,
.note,
.delete {
  flex-shrink: 0;
  margin-left: 24px;
}
.created-at {
  width: 144px;
}
.note {
  width: 382px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.delete {
  width: 21px;
}
.todo-list__header .created-at,
.todo-list__header .note {
  font-weight: 600;
}
.todo__wrapper .delete {
  cursor: pointer;
}

.add__wrapper {
  max-width: 480px;
}
.logoutButton {
  width: 240px;
}
@media screen and (max-width: 480px) {
  .pc {
    display: none;
  }
  .main {
    margin-top: 36px;
    width: calc(100% - 16px * 2);
  }
  .created-at {
    width: 96px;
  }
  .note {
    flex-grow: 2;
    flex-shrink: 1;
    width: auto;
  }
}
</style>
