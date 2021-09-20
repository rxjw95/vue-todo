<template>
  <div id="app">
    <div class="title">todos</div>
    <TodoTemplate></TodoTemplate>
    <p> 서버와 연결이 되지 않은 상태로 내부적으로 초기화된 데이터를 사용합니다. </p>
  </div>
</template>

<script>
import TodoTemplate from './components/TodoTemplate.vue'
export default {
  name: 'App',
  components: {
    TodoTemplate,
  },
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: gainsboro;
}

.title {
  font-size: 130px;
  margin-bottom: 1rem;
  font-weight: bold;
  opacity: 0.2;
  color: brown;
}
</style>
