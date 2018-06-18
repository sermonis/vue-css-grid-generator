<template>
  <div id="app">

    <div class="gridBuilder">
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
import gridSettings from './components/gridSettings'
import viewport from './components/viewport'
import itemSettings from './components/itemSettings'
import htmlCode from './components/html/htmlCode'
import cssCode from './components/css/cssCode'
export default {
  name: "app",
  components: {
    gridSettings,
    viewport,
    itemSettings,
    htmlCode,
    cssCode
  },
}
</script>

<style lang="stylus">

body
  padding 0
  margin 0
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.gridBuilder
  display grid;
  grid-template-rows 220px 1fr

.main
  display grid;
  grid-template-columns 1fr 320px
.codeOutput
  display grid
  height 50vh
  grid-template-columns 1fr 1fr
  .html
    background red
    overflow-y scroll
  .css
    background green
    overflow-y scroll
</style>
