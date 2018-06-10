<template>
  <div id="app">

    <div class="gridBuilder">

      <itemSettings></itemSettings>
      <div class="main">
        <viewport></viewport>
        <gridSettings></gridSettings>
      </div>
    </div>
  </div>
</template>

<script>
import gridSettings from './components/gridSettings'
import viewport from './components/viewport'
import itemSettings from './components/itemSettings'
export default {
  name: "app",
  components: {
    gridSettings,
    viewport,
    itemSettings
  },
}
</script>

<style>

body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gridBuilder {
  display: grid;
  grid-template-rows: 220px 1fr;
}
.main {
  display: grid;
  grid-template-columns: 1fr 320px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
