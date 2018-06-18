<template>
<pre class="language-html">
<code>&lt;div class="root"&gt;<htmlTag :sub-grid="i.subGrid" :key="index" v-for="(i, index) in items"></htmlTag>&lt;/div&gt;</code>
</pre>
</template>
<script>
import htmlTag from './htmlTag'

export default {
	name: 'htmlCode',
	components: {
		htmlTag
	},
	data: function() {
		return {
			items: this.$store.state.grid['root'].items
		}
	}
}
</script>
