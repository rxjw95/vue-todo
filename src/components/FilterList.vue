<template>
  <div class="filter-block">
    <div class="left"> {{getLeftTodos()}} </div>
    <div class="filter">
      <button :class="allBtn" @click="onClickFilterAllBtn">All</button>
      <button :class="activeBtn" @click="onClickFilterActiveBtn">Active</button>
      <button :class="completedBtn" @click="onClickFilterCompletedBtn">Completed</button>
    </div>
    <div class="clear" @click="onClickClearBtn">Clear</div>
  </div>
</template>

<script>
export default {
  name: 'FilterList',
  data() {
    return {
      selectBtns: ['btn all select', 'btn active', 'btn completed'],
    }
  },
  props: {
    todos: Array,
  },
  computed: {
    allBtn() {
      return this.selectBtns[0];
    },
    activeBtn() {
      return this.selectBtns[1];
    },
    completedBtn() {
      return this.selectBtns[2];
    }
  },
  methods: {
    onClickFilterAllBtn() {
      this.selectBtns = this.setSelectBtn(0);
      this.$emit("onClickFilterAllBtn");
    },
    onClickFilterActiveBtn() {
      this.selectBtns = this.setSelectBtn(1);
      this.$emit("onClickFilterActiveBtn");
    },
    onClickFilterCompletedBtn() {
      this.selectBtns = this.setSelectBtn(2);
      this.$emit("onClickFilterCompletedBtn");
    },
    onClickClearBtn() {
      this.$emit("onClickClearBtn");
    },

    getLeftTodos() {
      return this.todos.filter(todo => todo.status === "active").length + " item left";
    },
    setSelectBtn(idx) {
      return this.selectBtns.map(
        (btn, index) => 
          index == idx && !btn.includes(" select") 
            ? btn + " select" 
            : btn.replace(" select", ""));
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

  .select {
    background-color: #808080;
    color: white;
    border: 2px solid #808080;
  }

  .clear {
    cursor: pointer;
  }

</style>