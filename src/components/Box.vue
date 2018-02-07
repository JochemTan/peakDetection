<template>
<div>
    <div class="columns">
        <div class="column"></div>
        <div class="column">
            <div class="box">
                <div class="field is-grouped">
                        <input type="number" v-model="correctionNumber" class="input">
                        <button type="submit" class="button is-success" @click="changeCorrection">change correction</button>
                </div>
                <small> Bij het veranderen van de correction word de waarde die kleiner is dan de correctiewaarde verwijderd uit de array</small>
                <strong><small>De lijn zal steeds simpeler worden</small></strong>
            </div>
        </div>
        <div class="column"></div>
    </div>
    <div class="column">
      <br>
      <h1 class="center"><strong>Line with correction</strong></h1>
      <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                     <chart :data="correctionData" :labels="correctionLabel"></chart>
                </div>
            </div>
        </article>
      </div>
    </div>


  <div class="columns">
    <div class="column">
    <h1 class="center"><strong>Line without correction</strong></h1>
      <div class="box">
          <article class="media">
            <div class="media-content">
                <div class="content">
                    <chart :data="noCorrectionData" :labels="noCorrectionLabel"></chart>
                </div>
            </div>
        </article>
      </div>  
      <br>
     
      <!-- <box></box> -->
    </div>
</div>

  </div>
  
</template>
<script>
import chart from './Chart'
import data from '../../data.json'
import _ from 'lodash'
import peakDetection from '../../../../peakDetection/functions'
export default {
  data () {
    return {
      noCorrectionData: [],
      correctionData: [],
      noCorrectionLabel: [],
      correctionLabel: [],
      correctionNumber: 0.03
    }
  },
  components: {
    'chart': chart
  },
  beforeMount () {
    // console.log(peakDetection.getAverage(data))
    // let average = peakDetection.getAverage(data)
    // console.log(average)

    // setting the data for the first chart
    // console.log(data[1])
    _.forEach(data, value => {
      // console.log(value[1])
      this.noCorrectionData.push(value[1])
      this.noCorrectionLabel.push(value[0])
    })
    this.getCorrectionData()
    // console.log(this.noCorrectionData)
    // console.log(this.noCorrectionLabel)
  },
  methods: {
    getCorrectionData () {
        let average = 0
        let standaarddeviatie = 0
        let zScore = []

        average = peakDetection.getAverage(data)
        standaarddeviatie = peakDetection.getDeviation(data, average)

        _.forEach(data, value => {
            let z = peakDetection.getZScore(value[1], average, standaarddeviatie)
            zScore.push({date: value[0], value: z, data: value[1]})
        })
    
        _.forEach(zScore, (z) => {
            if (z.value > 0 && z.value < 0.03) {
                // console.log(z.value)
            }
            else {
                this.correctionData.push(z.data)
                this.correctionLabel.push(z.date)
            }
        })
    },
    changeCorrection () {
        this.correctionData = []
        this.correctionLabel = []
        let average = 0
        let standaarddeviatie = 0
        let zScore = []

        average = peakDetection.getAverage(data)
        standaarddeviatie = peakDetection.getDeviation(data, average)

        _.forEach(data, value => {
            let z = peakDetection.getZScore(value[1], average, standaarddeviatie)
            zScore.push({date: value[0], value: z, data: value[1]})
        })
    
        _.forEach(zScore, (z) => {
            if (z.value > 0 && z.value < this.correctionNumber) {
                // console.log(z.value)
            }
            else {
                this.correctionData.push(z.data)
                this.correctionLabel.push(z.date)
            }
        }) 
    }
  }
}
</script>
