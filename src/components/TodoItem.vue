<template>
  <div class="item-block">
    <div v-if="!isChange" class="item" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" >
      <div :class="checkCircle" @click="onClickCheckBtn">✔</div>
      <div :class="text" @dblclick="onDoubleClickText">{{details}}</div>
      <div :class="remove" @click="onClickRemoveBtn">x</div>
    </div>
    <div v-else class="change-item">
      <input 
        class="input-text" 
        :value="details" 
        @input="onChangeDetails"
        @keypress.enter="onPressChangeEnter"
        @blur="onCancleChange"
        @keyup.esc="onCancleChange"
        ref="editbar"
        />
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TodoItem',
  props: {
    id: String,
    details: String,
    status: String,
    changeId: String,
  },
  data() {
    return {
      isMouseEnter: false,
    }
  },
  computed: {
    remove() {
      return this.isMouseEnter ? 'remove over' : 'remove';
    },
    checkCircle() {
      return this.status === 'active' ? 'check-circle' : 'check-circle done';
    },
    text() {
      return this.status === 'active' ? 'text' : 'text done';
    },
    isChange : {
      get() {
        return this.id === this.changeId;
      },
      set() {

      }
    }
  },
  updated() {
    this.onEditFocus();
  },
  methods: {
    onEditFocus() {
      this.$refs.editbar && this.$refs.editbar.focus();
    }, 

    onClickCheckBtn() {
      this.$emit("onClickCheckBtn", this.id);
    },

    onDoubleClickText() {
      this.$emit("onDoubleClickText", this.id);
    },
    onChangeDetails($event) {
      this.$emit("onChangeDetails", $event.target.value);
    },
    onPressChangeEnter() {
      this.$emit("onPressChangeEnter", this.id);
    },
    onCancleChange() {
      this.$emit("onCancleChange");
    },

    onClickRemoveBtn() {
      this.$emit("onClickRemoveBtn", this.id);
    },

    onMouseEnter() {
      this.isMouseEnter = true; 
    },
    onMouseLeave() {
      this.isMouseEnter = false; 
    },
    
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
    font-size: 20px;
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
    opacity: 0;
    color: red;
    font-size: 27px;
    cursor: pointer;
    margin-left: auto;
    margin-right: 25px;
  }
  .remove.over {
    opacity: 1;
  }
  
</style>