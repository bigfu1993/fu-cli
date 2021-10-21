export default {
	data() {
		return {
			mixData: 'hello mixin'
		}
	},
	created() {
		console.log(`this is mixin module, provide data is ${this.mixData}`)
	}
}
