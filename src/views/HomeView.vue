<template lang="">
  <h1> To do List:</h1>
  <TodoList location="home"/>
</template>
<script>
import TodoList from '../components/TodoList.vue';
export default {
  name: "Homepage",
  components: {
    TodoList
  }
}
</script>
<style lang="">
  
</style>