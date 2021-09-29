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
import { getTasks, createTask, patchDetailsOfTask, patchStatusOfTask, deleteTask } from '../service/TaskService'

export default {
  name: 'TodoTemplate',
  components: {
    TodoItemList,
    Form,
    FilterList,
  },
  data() {
    return {
      original: [],
      todos: [],
      editDetails: "",
      changeDetails: "",
      id: 3,
    }
  },
  methods: {
    onClickAllCheckBtn(state) {
      this.todos = this.todos.map(todo => { return {...todo, status: state ? 'active' : 'done'}});
      this.original = [...this.todos];
    },
    onChangeEdit(details) {
      this.editDetails = details;
    },
    async onPressCreateEnter() {
      if(!this.editDetails.trim()) {
        alert("할 일을 입력하세요.");
        return;
      }

      const createdTodo = {
        details: this.editDetails,
        status: 'active',
      };
      createdTodo.id = await createTask(createdTodo);
      
      this.original = [...this.original, createdTodo];
      this.todos = [...this.original];
      this.editDetails = "";
    },

    async onClickCheckBtn(id) {
      const checkedTodo = this.original.find(todo => todo.id === id);
      checkedTodo.status = checkedTodo.status === 'active' ? 'done' : 'active';

      const modifiedTodo = await patchStatusOfTask(checkedTodo);

      this.original = this.original.map(todo => todo.id === id ? { ...todo, ...modifiedTodo } : todo);
      this.todos = [...this.original];
    },
    onChangeDetails(details) {
      this.changeDetails = details;
    },
    async onPressChangeEnter(id) {
      if(!this.changeDetails.trim()) {
        return;
      }
      const changeTodo = this.original.find(todo => todo.id === id);
      changeTodo.details = this.changeDetails;

      const modifiedTodo = await patchDetailsOfTask(changeTodo);
      
      this.original = this.original.map(todo => todo.id === id ? { ...todo, ...modifiedTodo} : todo)
      this.todo = [...this.original];
      this.editDetails = "";
    },
    async onClickRemoveBtn(id) {
      await deleteTask(id);
    
      this.original = this.original.filter(todo => todo.id !== id);
      this.todos = [...this.original];
    },

    onClickFilterAllBtn() {
      this.todos = this.original.filter(todo => todo); 
    },
    onClickFilterActiveBtn() {
      this.todos = this.original.filter(todo => todo.status === 'active');
    },
    onClickFilterCompletedBtn() {
      this.todos = this.original.filter(todo => todo.status === 'done');
    },
    onClickClearBtn(){
      this.todos = this.todos.filter(todo => todo.status === "active");
      this.original = [...this.todos];
    },
    
  },
  async mounted() {
      this.original = await getTasks();
      this.todos = [...this.original];
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