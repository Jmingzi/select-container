A cascaded or non cascade selection or picker container with Vue.js, which does not support PC

## Install
```
$ npm install select-container --save
```

## How to use
```html
<template>
  <city-select
    v-if="showSelect"
    :cascadeData="cascadeData"
    :selected="selected"
    @selectCallback="handleSelect"
    @confirmSelect="confirmSelect"
    @cancelSelect="cancelSelect">
  </city-select>
</template>

<script>
import SelectContainer from 'select-container'

export default {
  data () {
    return {
      cascadeData: [],
      selected: []
    }
  }
}
</script>
```

## Props and methods

name | description
-----|-------
cascadeData | [[ {name: '北京', code: 1} ], ... ]
selected | the same
selectCallback | triggered callback function
confirmSelect | receive one parameter
cancelSelect | close select

## Performance
![demo](./src/assets/demo.png)
