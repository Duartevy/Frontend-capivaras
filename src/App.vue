<template>
  <div id="app">
    <CapivaraList />
  </div>
</template>

<script>
import CapivaraList from './components/CapivaraList.vue';  // Importando o componente de lista

export default {
  name: 'App',
  components: {
    CapivaraList  // Registrando o componente
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
