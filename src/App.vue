<template>
  <div id="app">
    <landing />
    <div id="grid" class="gridBuilder">
      <itemSettings></itemSettings>
      <div class="main">
        <viewport></viewport>
        <gridSettings></gridSettings>
      </div>
    </div>
    <div class="codeOutput">
      <div class="html">
        <htmlCode></htmlCode>
      </div>
      <div class="css">
        <cssCode></cssCode>
      </div>
    </div>
  </div>
</template>

<script>
import gridSettings from './components/gridSettings';
import viewport from './components/viewport';
import itemSettings from './components/itemSettings';
import htmlCode from './components/html/htmlCode';
import cssCode from './components/css/cssCode';
import landing from './components/landing.vue';
export default {
	name: 'app',
	components: {
		gridSettings,
		viewport,
		itemSettings,
		htmlCode,
		cssCode,
		landing
	}
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Inconsolata|Montserrat:400,600|Poppins:400,500,600|Karla');

body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.gridBuilder {
  display: grid;
  grid-template-rows: 220px 1fr;
}

.main {
  display: grid;
  grid-template-columns: 1fr 320px;
}

.codeOutput {
  display: grid;
  height: 70vh;
  grid-template-columns: 1fr 1fr;
  tab-size: 2;
  grid-column-gap: 3px;
  line-height: 2em;
  letter-spacing: 0.1em;
  padding: 3px 0;
  background: #333;

  .html {
    background: #050505;
    overflow-y: auto;
    color: #fff;
    padding: 50px 50px;
  }

  .css {
    background: #050505;
    overflow-y: auto;
    color: #fff;
    padding: 50px 50px;
  }
}
</style>
