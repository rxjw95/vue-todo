<template>
  <div class="item-block">
    <!-- <TodoItem/>-->
    <div :class="checkCircle" @click="onClickCheckBtn">✔</div>
    <div :class="text">{{details}}</div>
    <div class="remove" @click="onClickRemoveBtn">x</div>
  </div>
</template>

<script>

export default {
  name: 'TodoItem',
  props: {
    id: Number,
    details: String,
    status: String,
  },
  computed: {
    checkCircle() {
      return this.status === 'active' ? 'check-circle' : 'check-circle done';
    },
    text() {
      return this.status === 'active' ? 'text' : 'text done';
    }
  },
  methods: {
    
    onClickCheckBtn() {
      this.$emit("onClickCheckBtn", this.id);
    },
    onClickRemoveBtn() {
      this.$emit("onClickRemoveBtn", this.id);
    }
  }
}

</script>

<style>
  .item-block {
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid gainsboro
  }

  .check-circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid lightgrey;
    font-size: 18px;
    margin-right: 20px;
    margin-left: 9px;
    color:white;
    cursor: pointer;
  }

  .check-circle.done {
    border: 1px solid #42B984;
    background: #42B984;
    color: white;
  }

  .text {
    font-size: 20px;
    color: black;
    transition: all ease .5s 0s;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .text.done {
    color: lightgray;
    text-decoration: line-through;
  }

  .remove {
    right: 25px;
    opacity: .2;
    color: red;
    font-size: 27px;
    cursor: pointer;
    margin-left: auto;
    margin-right: 25px;
  }
  .remove:hover {
    opacity: 1;
  }
  
</style>