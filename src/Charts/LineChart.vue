<script>
	import { Line } from 'vue-chartjs'

	export default {
	  name: 'LineChart',
	  extends: Line,
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