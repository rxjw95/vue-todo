<template>
  <div class="filter-block">
    <div class="left"> {{getLeftTodos()}} </div>
    <div class="filter">
      <button :class="allBtn" @click="onClickFilterAllBtn">All</button>
      <button :class="activeBtn" @click="onClickFilterActiveBtn">Active</button>
      <button :class="completedBtn" @click="onClickFilterCompletedBtn">Completed</button>
    </div>
    <div :class="clearBtn" @click="onClickClearBtn">Clear completed</div>
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  data() {
    return {
      filterMode: "all",
    }
  },
  props: {
    todos: Array,
  },
  computed: {
    allBtn() {
      return this.filterMode === "all" ? "btn all" : "btn";
    },
    activeBtn() {
      return this.filterMode === "active" ? "btn active" : "btn";
    },
    completedBtn() {
      return this.filterMode === "done" ? "btn done" : "btn";
    },
    clearBtn() {
      return this.hasCompletedTodo() ? "clearBtn" : "clearBtn hidden";
    }
  },
  methods: {
    onClickFilterAllBtn() {
      this.filterMode = 'all';
      this.$emit("onClickFilterAllBtn");
    },
    onClickFilterActiveBtn() {
      this.filterMode = 'active';
      this.$emit("onClickFilterActiveBtn");
    },
    onClickFilterCompletedBtn() {
      this.filterMode = 'completed';
      this.$emit("onClickFilterCompletedBtn");
    },
    onClickClearBtn() {
      this.$emit("onClickClearBtn");
    },

    getLeftTodos() {
      return this.todos.filter(todo => todo.status === "active").length + " item left";
    },

    hasCompletedTodo() {
      return this.todos.find(todo => todo.status === 'done') !== undefined;
    }
  },
}
</script>

<style>
  .filter-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: gray;
    padding: 25px;
    height: 30px;
  }

  .left {
      font-size: 15px;
  }

  .filter {
    display: flex;
    align-items: center;
    margin:auto;
  }

  
  .btn {
    border: 2px solid lightgray;
    background-color: white;
    color: black;
    padding: 3px 6px;
    border-radius: 5px;
    margin-left: 5px;
    color:#808080;
    font-size: 12px;
    cursor: pointer;
  }
  .btn:hover {
    border: 2px solid #808080;
  }

  .btn.all, .btn.active, .btn.done {
    background-color: #808080;
    color: white;
    border: 2px solid #808080;
  }

  .clearBtn {
    cursor: pointer;
  }
  .hidden {
    visibility: hidden;
  }

</style>