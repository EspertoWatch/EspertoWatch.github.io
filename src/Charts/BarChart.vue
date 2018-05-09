<script>
	import { Bar } from 'vue-chartjs'

	export default {
	  name: 'BarChart',
	  extends: Bar,
	  props: ['data', 'options'],
	  watch: {
	    'options': {
	      handler (newOption, oldOption) {
	        this.$data._chart.destroy()
	        this.renderChart(this.data, this.options)
	      },
	      deep: true
	    },
			'data': {
	      handler (newData, oldData) {
	        this.$data._chart.destroy()
	        this.renderChart(this.data, this.options)
	      },
	      deep: true
	    }
	  },
	  mounted () {
	    this.renderChart(this.data, this.options)
	  }
	}
</script>