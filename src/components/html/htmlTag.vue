<template>
<pre v-if="subGrid === 'none'">
{{indentation}}&lt;div&gt;&lt;/div&gt;</pre>
<pre v-else>
{{indentation}}&lt;div <span class="attr-name">class</span><span class="attr-symbol">=</span><span class="attr-value">"{{grid}}"</span>&gt;<htmlTag :prevIndent="indentation" :sub-grid="i.subGrid" :key="index" v-for="(i, index) in items">{{indentation}}</htmlTag>{{indentation}}&lt;/div&gt;</pre>
</template>

<script>
export default {
	name: 'htmlTag',
	props: ['subGrid', 'prevIndent'],
	data: function() {
		return {
			indentSize: '	'
		};
	},
	computed: {
		grid: function() {
			return this.subGrid;
		},
		indentation: function() {
			return this.prevIndent
				? this.prevIndent + this.indentSize
				: this.indentSize;
		},
		items: function() {
			return this.$store.state.grid[this.grid].items;
		}
	}
};
</script>
<style scoped>
pre,
code {
	font-family: Inconsolata;
	margin: 0;
}

.attr-name {
	color: greenyellow;
}
.attr-value {
	color: sandybrown;
}
</style>
