<template>
<pre class="language-html">
<code>&lt;div <span class="attr-name">class</span><span class="attr-symbol">=</span><span class="attr-value">"root"</span>&gt;<htmlTag :sub-grid="i.subGrid" :key="index" v-for="(i, index) in items"></htmlTag>&lt;/div&gt;</code>
</pre>
</template>
<script>
import htmlTag from './htmlTag';

export default {
	name: 'htmlCode',
	components: {
		htmlTag
	},
	data: function() {
		return {
			items: this.$store.state.grid['root'].items
		};
	}
};
</script>

<style scoped>
pre,
code {
	font-family: Inconsolata;
	margin: 0;
	font-weight: 600;
	color: turquoise;
}
.attr-name {
	color: greenyellow;
}
.attr-value {
	color: sandybrown;
}
</style>

