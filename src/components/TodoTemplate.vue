<template>
  <main class="todo-list-template">
    
    <section class="form-wrapper">
        <Form 
          :todos="todos"
          :value="editDetails"
          @onClickAllCheckBtn="onClickAllCheckBtn"
          @onChangeEdit="onChangeEdit"
          @onEnterPress="onEnterPress"/>
    </section>

    <section class="todos-wrapper">
        <TodoItemList 
          :todos="todos"
          @onClickCheckBtn="onClickCheckBtn"
          @onClickRemoveBtn="onClickRemoveBtn" />
    </section>
    
    <section class="filter-wrapper">
        <FilterList 
          :todos="todos" 
          @onClickFilterAllBtn="onClickFilterAllBtn"
          @onClickFilterActiveBtn="onClickFilterActiveBtn"
          @onClickFilterCompletedBtn="onClickFilterCompletedBtn"
          @onClickClearBtn="onClickClearBtn"/>
    </section>

  </main>
</template>

<script>
import Form from './Form.vue';
import TodoItemList from './TodoItemList.vue';
import FilterList from './FilterList.vue';

export default {
  name: 'TodoTemplate',
  components: {
    TodoItemList,
    Form,
    FilterList,
  },
  data() {
    return {
      todos: [
        {id: 0, details: "스프링 공부", status: "active"},
        {id: 1, details: "스프링 중", status: "done"},
        {id: 2, details: "스프링 포기", status: "active"},
      ],
      editDetails: "",
    }
  },
  methods: {
    onClickAllCheckBtn(state) {
      this.todos = this.todos.map(todo => { return {...todo, status: state ? 'active' : 'done'}});
    },
    onChangeEdit(details) {
      this.editDetails = details;
    },
    onEnterPress() {
      if(!this.editDetails) {
        alert("할 일을 입력하세요.");
        return;
      }
      this.todos = [...this.todos, {id: this.todos.length, details: this.editDetails, status: 'active'}];
      this.editDetails = "";
    },
    onClickCheckBtn(id) {
      this.todos = this.todos.map(todo => todo.id === id ? { ...todo, status: todo.status === 'active' ? 'done' : 'active' } : todo);
    },
    onClickRemoveBtn(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    onClickFilterAllBtn() {
      this.todos = this.todos.filter(todo => todo);
    },
    onClickFilterActiveBtn() {
      this.todos = this.todos.filter(todo => todo.status === 'active');
    },
    onClickFilterCompletedBtn() {
      this.todos = this.todos.filter(todo => todo.status === 'done');
    },
    onClickClearBtn(){
      this.todos = [];
    },
    
  },
  
}
</script>

<style>
  .todo-list-template {
  background: white;
  width: 628px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); /* 그림자 */
  margin: 0 auto;
}

.form-wrapper {
  padding: .7rem;
  border-bottom: 2px solid lightgrey;
}

.todos-wrapper {
  min-height: 5rem;
}

.filter-wrapper {
  min-height: 3rem;
}
</style>