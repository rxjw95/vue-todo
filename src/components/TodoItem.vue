<template>
  <div class="item-block">
    <div v-if="!isChange" class="item" >
      <div :class="checkCircle" @click="onClickCheckBtn">✔</div>
      <div :class="text" @dblclick="onDoubleClickText">{{details}}</div>
      <div class="remove" @click="onClickRemoveBtn">x</div>
    </div>
    <div v-else class="change-item">
      <input 
        class="input-text" 
        :value="value" 
        @input="onChangeDetails"
        @keyup.enter="onPressChangeEnter"
        @blur="onCancle"
        @keyup.esc="onCancle"
        autofocus/>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TodoItem',

  data() {
    return {
      isChange: false,
    };
  },

  props: {
    id: Number,
    details: String,
    status: String,
    value: String,
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

    onDoubleClickText() {
      //TODO: TodoItemList로 변경되는 id를 emit 해주고 상위 컴포넌트에서 재렌더링하기
      this.isChange = true ;
    },
    onChangeDetails($event) {
      this.$emit("onChangeDetails", $event.target.value);
    },
    onPressChangeEnter() {
      this.$emit("onPressChangeEnter", this.id);
    },
    //TODO: press esc 키도 고려, 취소 이벤트도 emit 으로 상위 컴포넌트에서 재렌더링
    onCancle() {
      this.isChange = false;
    },

    onClickRemoveBtn() {
      this.$emit("onClickRemoveBtn", this.id);
    }
  }
}

</script>

<style>
  .item-block {
    padding-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid gainsboro
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
  
  .input-text {
    font-size: 25px;
    width: 80%;
    color: black;
    transition: all ease .5s 0s;
    align-items: center;
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

  .text.input {
    flex: 1;
    margin-right: 10px;
    margin-left: 5px;
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