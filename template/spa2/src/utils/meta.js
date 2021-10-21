export default function metaInfo() {
	return {
		title: this.$store.state.metaInfo.title,
		meta: [{
			name: "keywords",
			content: this.$store.state.metaInfo.keywords
		}, {
			name: "description",
			content: this.$store.state.metaInfo.description
		}]
	}
},
