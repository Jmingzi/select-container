<template>
  <div id="app">
    <p>已选择：{{ selected }}}</p>
    <a href="javascript:" @click="showSelect = !showSelect">选择级联数据</a>
    <city-select
      v-if="showSelect"
      :cascadeData="cascadeData"
      :selected="selected"
      @selectCallback="handleSelect"
      @confirmSelect="confirmSelect"
      @cancelSelect="cancelSelect">
    </city-select>
  </div>
</template>

<script>
// import CitySelect from './components/SelectContainer'
import CitySelect from '../m-dist/selectContainer'
import {
  firstLevelData,
  secondLevelData,
  thirdLevelData,
  fourthLevelData
} from './components/constant'

export default {
  name: 'app',
  data () {
    return {
      showSelect: false,
      cascadeData: [ firstLevelData, secondLevelData, thirdLevelData, fourthLevelData ],
      selected: [
        firstLevelData[3],
        secondLevelData[1],
        thirdLevelData[0],
        fourthLevelData[1]
      ]
    }
  },
  methods: {
    handleSelect (index, level) {
      console.log(`select callback, index: ${index}, level: ${level}`)
    },
    confirmSelect (result) {
      this.selected = result
      this.showSelect = false
    },
    cancelSelect () {
      this.showSelect = false
    }
  },
  components: {
    CitySelect
  }
}
</script>

<style>
  div {
    box-sizing: border-box;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
