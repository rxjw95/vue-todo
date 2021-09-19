<template>
   <div class='form'>
      <div :class="toggleBtn" @click="onClickAllCheckBtn" :style='{visibility: visibility}'> ▼ </div>
      <input 
        placeholder="What needs to be done?" 
        :value="value" 
        @input="onChangeEdit" 
        @keyup.enter="onPressCreateEnter" />
    </div>
    
</template>

<script>
export default {
  name: 'Form',
  props: {
    todos: Array,
    value: {
      type: String,
      default: "",
    }
  },
  methods: {
    onClickAllCheckBtn() {
      this.$emit("onClickAllCheckBtn", this.isAllCheck());
    },
    onChangeEdit($event) {
      this.$emit("onChangeEdit", $event.target.value);
    },
    onPressCreateEnter() {
      this.$emit("onPressCreateEnter");
    },

    getAllTodos() {
      return this.todos.length;
    },
    isAllCheck() {
      return this.todos.every(todo => todo.status === 'done');
    }
  },
  computed: {
    toggleBtn() {
      return this.isAllCheck() ? 'toggle-btn selected' : 'toggle-btn'; 
    },
    visibility() {
      return this.getAllTodos() == 0 ? 'hidden' : 'visible' 
    }

  }
}
</script>

<style>
  .form {
  display: flex;
}

.form input {
  flex: 1; /* 버튼을 뺀 빈 공간을 모두 채워줍니다 */
  font-size: 1.25rem;
  outline: none;
  border: none;
}

.toggle-btn {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: .5rem;
  background: white;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  color: gray;
  font-weight: 600;
  cursor: pointer;

  -ms-user-select: none; 
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.toggle-btn:hover {
  color: #42B984;
}
.toggle-btn:active {
  color: #029524
}

.selected {
  color: #42B984;
}

</style>