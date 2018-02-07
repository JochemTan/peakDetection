<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'labels'],
  mounted () {
    // Overwriting base render method with actual data.
    let data = {
        labels: this.labels,
        datasets: [
            {
                label: 'test data',
                borderColor: '#bfcde0',
                fill: false,
                data: this.data 
            }
        ]
    }

    let options = {
      responsive: true,
      maintainAspectRatio: false,
      scaleShowGridLines: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 100
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Silo naam'
          }
        }]
      }
    }

    this.renderChart(data, options)
  },
  watch: {
      data () {
           let datacollection = {
            labels: this.labels,
            datasets: [
                {
                    label: 'test data',
                    borderColor: '#bfcde0',
                    fill: false,
                    data: this.data 
                }
            ]
        }

      let options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowGridLines: true,
        scales: {
            yAxes: [{
            ticks: {
                min: 0,
                max: 100
            },
            scaleLabel: {
                display: true,
                labelString: 'Percentage'
            }
            }],
            xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Silo naam'
            }
            }]
        }
    }
        this.$data._chart.destroy()
        this.renderChart(datacollection, options)
      }
  }
}
</script>
    