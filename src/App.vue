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
  data() {
    return {
      certainCellsSizes: [
      {fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'} ,
      {fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'} ,
      {fromCol: 'auto',toCol: 'auto',fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'} 
      ],
      columns: "2",
      rows: "2",
      gridColumnsPattern: ["1fr", "1fr"],
      gridRowsPattern: ["1fr", "1fr"],
      justifyItems: "start",
      alignItems: "start",
      justifyContent: "start",
      alignContent: "start",
      autoFlow: "row",
      columnsGap: 0,
      rowsGap: 0,
      itemsCount: 3,
      gridHeight: "500px",
      gridWidth: "500px"
    };
  },
  computed: {
    conatinerStyle: function() {
      return {
        gridTemplateColumns: this.gridColumnsPattern.join(" "),
        gridTemplateRows: this.gridRowsPattern.join(" "),
        gridColumnGap: this.columnsGap,
        gridRowGap: this.rowsGap,
        height: this.gridHeight,
        width: this.gridWidth,
        justifyContent: this.justifyContent,
        alignContent: this.alignContent
      };
    },
    gridStyle: function() {
      return {
        ...this.conatinerStyle,
        justifyItems: this.justifyItems,
        alignItems: this.alignItems,
        gridAutoFlow: this.autoFlow
      };
    }
    ,
    backGridStyle: function() {
      return {
        ...this.conatinerStyle,
        gridAutoFlow: this.autoFlow
      }
    }
  },
  methods: {
    rebuildGrid: function (settings) {
      alert(settings)
    },
    changeColumnsCount: function() {
      let gridColumns = [...this.gridColumnsPattern];
      for (let i = 0; i < this.columns; i++) {
        if (i < gridColumns.length) continue;
        gridColumns[i] = "1fr";
      }
      if (gridColumns.length > this.columns) {
        gridColumns.splice(this.columns, gridColumns.length);
      }
      this.gridColumnsPattern = gridColumns;
    },
    changeRowsCount: function() {
      let gridRows = [...this.gridRowsPattern];
      for (let i = 0; i < this.rows; i++) {
        if (i < gridRows.length) continue;
        gridRows[i] = "1fr";
      }
      if (gridRows.length > this.rows) {
        gridRows.splice(this.rows, gridRows.length);
      }
      this.gridRowsPattern = gridRows;
    },
    certainCellStyle: function(n) {
      return {
        gridColumn: this.certainCellsSizes[n].fromCol + ' / ' + (this.certainCellsSizes[n].toCol == "auto" ? this.certainCellsSizes[n].toCol : parseInt(this.certainCellsSizes[n].toCol) + 1),
        gridRow: this.certainCellsSizes[n].fromRow + ' / ' + (this.certainCellsSizes[n].toRow == "auto" ? this.certainCellsSizes[n].toRow : parseInt(this.certainCellsSizes[n].toRow) + 1),
        justifySelf: this.certainCellsSizes[n].justifySelf,
        alignSelf: this.certainCellsSizes[n].alignSelf
      }
    }
  },
  watch: {
    itemsCount: function() {
      let cs = [...this.certainCellsSizes]
      if(this.itemsCount > cs.length) {
        while (this.itemsCount != cs.length) {
          cs.push({fromCol: 'auto',toCol: 'auto', fromRow: 'auto', toRow: 'auto', justifySelf: 'none', alignSelf: 'none'})
        }
      }
      this.certainCellsSizes = cs;
    }
  }
};
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
