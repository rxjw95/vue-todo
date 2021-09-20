<template>
  <div class="todo-list-block">
    <!--TODO: 자식으로 온 더블 클릭 이벤트의 id로 부터 change props를 전달-->
    <div v-for="todo in todos" :key="todo.details"> 
      <TodoItem 
        :id="todo.id"
        :details="todo.details" 
        :status="todo.status"
        :changeId="changeId"
        @onClickCheckBtn="onClickCheckBtn"
        @onDoubleClickText="onDoubleClickText"
        @onChangeDetails="onChangeDetails"
        @onPressChangeEnter="onPressChangeEnter"
        @onCancleChange="onCancleChange"
        @onClickRemoveBtn="onClickRemoveBtn"
        />
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue';
export default {
  name: 'TodoItemList',
  components: {
    TodoItem,
  },
  data() {
    return {
      changeId: -1,
    }
  },
  props: {
    todos: Array,
  },
  methods: {
    onClickCheckBtn(id) {
      this.$emit("onClickCheckBtn", id);
    },
    onDoubleClickText(id) {
      this.changeId = id;
    },
    onChangeDetails(details) {
      this.$emit("onChangeDetails", details);
    },
    onPressChangeEnter(id) {
      this.changeId = -1;
      this.$emit("onPressChangeEnter", id);
    },
    onCancleChange() {
      this.changeId = -1;
    },
    onClickRemoveBtn(id) {
      this.$emit("onClickRemoveBtn", id);
    }
  },

}
</script>

<style>
  .todo-list-block {
    flex: 1;
    padding: 10px 15px;
    padding-bottom: 10px;
    overflow-y: auto;
  }
</style>