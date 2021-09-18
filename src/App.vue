<template>
  <div id="app">
    <div class="title">todos</div>
    <TodoTemplate></TodoTemplate>
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
