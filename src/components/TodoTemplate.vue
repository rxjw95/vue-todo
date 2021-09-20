<template>
  <main class="todo-list-template">
    
    <section class="form-wrapper">
        <Form 
          :todos="todos"
          :value="editDetails"
          @onClickAllCheckBtn="onClickAllCheckBtn"
          @onChangeEdit="onChangeEdit"
          @onPressCreateEnter="onPressCreateEnter"/>
    </section>

    <section class="todos-wrapper">
        <TodoItemList 
          :todos="todos"
          @onClickCheckBtn="onClickCheckBtn"
          @onChangeDetails="onChangeDetails"
          @onPressChangeEnter="onPressChangeEnter"
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
      originalTodos:  [
        {id: 0, details: "스프링 공부", status: "active"},
        {id: 1, details: "스프링 중", status: "done"},
        {id: 2, details: "스프링 포기", status: "active"},
      ],
      todos: [
        {id: 0, details: "스프링 공부", status: "active"},
        {id: 1, details: "스프링 중", status: "done"},
        {id: 2, details: "스프링 포기", status: "active"},
      ],
      editDetails: "",
      changeDetails: "",
    }
  },
  methods: {
    onClickAllCheckBtn(state) {
      // this.todos = this.todos.map(todo => { return {...todo, status: state ? 'active' : 'done'}});
      this.todos = this.originalTodos.map(todo => { return {...todo, status: state ? 'active' : 'done'}});
      this.originalTodos = [...this.todos]; //원본 유지용
    },
    onChangeEdit(details) {
      this.editDetails = details;
      console.log(this.editDetails);
    },
    onPressCreateEnter() {
      if(!this.editDetails.trim()) {
        alert("할 일을 입력하세요.");
        return;
      }
      this.todos = [...this.todos, {id: this.todos.length, details: this.editDetails, status: 'active'}];
      this.originalTodos = [...this.todos]; //원본 유지용
      this.editDetails = "";
    },

    onClickCheckBtn(id) {
      this.todos = this.todos.map(todo => todo.id === id ? { ...todo, status: todo.status === 'active' ? 'done' : 'active' } : todo);
      this.originalTodos = [...this.todos]; //원본 유지용
    },
    onChangeDetails(details) {
      this.changeDetails = details;
    },
    onPressChangeEnter(id) {
      this.changeDetails = this.changeDetails.trim();
      if(!this.changeDetails) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.originalTodos = [...this.todos]; //원본 유지용
        return;
      }
      this.todos = this.todos.map(todo => todo.id === id ? { ...todo, details: this.changeDetails} : todo)
      this.originalTodos = [...this.todos]; //원본 유지용
      this.editDetails = "";
    },

    onClickRemoveBtn(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.originalTodos = [...this.todos]; //원본 유지용
    },

    onClickFilterAllBtn() {
      //this.todos = this.todos.filter(todo => todo); 
      this.todos = [...this.originalTodos]; //원봉 유지용
    },
    onClickFilterActiveBtn() {
      // this.todos = this.todos.filter(todo => todo.status === 'active');
      this.todos = this.originalTodos.filter(todo => todo.status === 'active'); //원봉 유지용
    },
    onClickFilterCompletedBtn() {
      // this.todos = this.todos.filter(todo => todo.status === 'done');
      this.todos = this.originalTodos.filter(todo => todo.status === 'done'); //원봉 유지용
    },
    onClickClearBtn(){
      // this.todos = this.todos.filter(todo => todo.status === "active");
      this.todos = this.originalTodos.filter(todo => todo.status === "active");
      this.originalTodos = [...this.todos];
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