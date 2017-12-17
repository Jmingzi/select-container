<template>
  <div class="select-mask" @touchmove.prevent="">
    <div class="select-wrap">
      <div class="select-tab">
        <span class="cancel" @click="$emit('cancelSelect')">取消</span>
        <span class="confirm" @click="confirmSelect">确定</span>
        <span class="title">请选择</span>
      </div>
      <div :class="`select-content`">
        <div class="line" ref="line"></div>
        <template v-for="(levelData, level) in cascadeData">
          <div
            class="select-item"
            :key="level"
            :data-level="level"
            :data-length="levelData.length"
            v-picker="{ select }"
            v-show="levelData.length > 0">
            <div class="select-item-wrap">
              <div
                class="city-item"
                v-for="item in levelData"
                :data-code="item.code"
                :key="item.code">{{ item.name }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        itemHeight: 0,
        itemElem: [],
        selectResult: []
      }
    },
    props: {
      cascadeData: {
        type: Array,
        default: function () {
          return []
        }
      },
      selected: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted () {
      this.getItemElem()
      this.itemHeight = this.$refs.line.offsetHeight
      if (this.selected.length > 0) {
        this.selected.forEach((item, level) => {
          let index = this.cascadeData[level].findIndex(x => x.code === item.code)
          this.scrollTo(level, index)
        })
      }
    },
    directives: {
      picker: {
        bind (el, binding, vNode) {
          // 开始位置
          let startY = 0
          // 距离差值
          let differY = 0
          // 偏移值
          let translateY = 0
          // 每一列数量
          let cityItemLen = 0
          // 容器
          let cityWrapElem = el.childNodes[0]
          // 当前滑动的层级
          let level

          el.addEventListener('touchstart', (e) => {
            level = Number(el.getAttribute('data-level'))
            startY = e.touches[0].clientY
            cityItemLen = Number(el.getAttribute('data-length'))
            // 初始化偏移值
            if (el.childNodes[0].style.transform) {
              translateY = Number(el.childNodes[0].style.transform.replace(/[^\d|-]/g, ''))
            }
          })

          el.addEventListener('touchmove', (e) => {
            differY = e.touches[0].clientY - startY
            cityWrapElem.style.transition = ``
            cityWrapElem.style.transform = `translateY(${translateY + differY}px)`
          })

          el.addEventListener('touchend', () => {
            let scrollToIndex = 0
            translateY = differY + translateY
            cityWrapElem.style.transition = `all .3s`

            if (translateY > 0) {
              translateY = 0
              cityWrapElem.style.transform = `translateY(${translateY}px)`
              console.log(`scroll top over range`)
            } else {
              scrollToIndex = Math.round(Math.abs(translateY) / vNode.context.itemHeight)

              if (scrollToIndex >= cityItemLen) {
                scrollToIndex = cityItemLen - 1
                console.log(`scroll bottom over range`)
              }

              translateY = -scrollToIndex * vNode.context.itemHeight
              cityWrapElem.style.transform = `translateY(${translateY}px)`
            }
            // callback
            binding.value.select(scrollToIndex, level)
          })
        }
      }
    },
    methods: {
      getItemElem () {
        this.itemElem = document.querySelectorAll('.select-item')
      },
      scrollTo (level, index = 0) {
        let translateY = -index * this.itemHeight
        this.itemElem[level].childNodes[0].style.transform = `translateY(${translateY}px)`
        this.select(index, level)
      },
      resetTransForm (index) {
        Array.from(this.itemElem).forEach((item, i) => {
          if (i > index) {
            item.childNodes[0].style.transform = ''
          }
        })
      },
      // touchend时的回调，获取当前定位的值
      // @param index {Number} 当前值的下标
      // @param level {Number} 指令修饰符的值
      select (index, level) {
        this.resetTransForm(level)
        this.$set(this.selectResult, level, this.cascadeData[level][index])
        this.$emit('selectCallback', index, level)
      },
      confirmSelect () {
        this.$emit('confirmSelect', this.selectResult)
      }
    }
  }
</script>

<style lang="scss">
  $main: #fa565a;

  .select-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    z-index:11;
  }

  .select-wrap {
    position: absolute;
    width: 100%;
    height: 360px;
    background-color: #fff;
    bottom: 0;
    left: 0;
    text-align: left;

    .select-tab {
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      text-align: center;
      border-bottom: 1px #cdcdcd solid;

      .confirm {
        float: right;
        color: $main;
      }

      .cancel {
        float: left;
        color: $main;
      }

      .title {
        font-size: 16px;
      }
    }

    .select-content {
      position: relative;
      height: 320px;
      font-size: 14px;
      text-align: center;

      .select-item {
        float: left;
        text-align: left;
        overflow: hidden;
        width: 25%;
        height: 100%;
        transition: width .3s;
      }

      .select-item-wrap {
        position: relative;
        z-index: 2;
        margin-top: 138px;
        padding: 0 15px;
      }

      .city-item {
        height: 44px;
        line-height: 44px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .line {
        position: absolute;
        width: 100%;
        height: 44px;
        top: 50%;
        margin-top: -22px;
        border-top: 1px #f2f2f2 solid;
        border-bottom: 1px #f2f2f2 solid;
      }
    }

  }
</style>
