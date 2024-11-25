<template>
    <div
        class="ValidCode disabled-select"
        :style="`width:${width}; height:${height}`"
        @click="refreshCode"  
    > <!-- :style="`width:${width}; height:${height}`": 根据传入的 width 和 height 属性动态设置宽度和高度; @click="refreshCode": 点击刷新验证码 -->
        <span
          v-for="(item, index) in codeList"
          :key="index"
          :style="getStyle(item)"
      >{{ item.code }}</span> <!-- v-for="(item, index) in codeList"：遍历 codeList 数组，生成每个字符。:key="index"：为每个字符生成唯一的键值。
      :style="getStyle(item)"：根据 item 对象中的样式属性动态设置样式。{{ item.code }}：显示字符。 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'ValidCode',
    model: { // model：定义了组件的双向绑定属性，prop 为 value，event 为 input。
      prop: 'value',
      event: 'input'
    },
    props: { // props：定义了组件的属性.
      width: { // width：验证码容器的宽度，默认值为 '100px'
        type: String,
        default: '100px'
      },
      height: { // height：验证码容器的高度，默认值为 '40px'
        type: String,
        default: '40px'
      },
      length: { // length：验证码的长度，默认值为 4
        type: Number,
        default: 4
      },
      refresh: { // refresh：用于监听外部传入的刷新信号。
        type: Number
      }
    },
    data () { // data：定义了组件的状态数据。
      return { // codeList：存储生成的验证码字符数组。
        codeList: []
      }
    },
    watch: { // watch：定义了组件的监听器。
      refresh () { // 监听 refresh 属性的变化，当 refresh 发生变化时，调用 createdCode 方法重新生成验证码。
        this.createdCode()
      }
    },
    mounted () { // mounted：定义了组件的挂载函数。组件挂载完成后，调用 createdCode 方法生成初始验证码。
      this.createdCode()
    },
    methods: { // methods：定义了组件的方法。
      refreshCode () { // refreshCode：刷新验证码，调用 createdCode 方法。
        this.createdCode()
      },
      createdCode () { // createdCode：生成验证码，随机生成指定长度的验证码字符，并设置样式属性。
        const len = this.length
        const codeList = [] // codeList：存储生成的验证码字符数组。
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
        const charsLen = chars.length
        // 生成
        for (let i = 0; i < len; i++) { // 循环生成指定数量的字符，每个字符随机生成颜色、字体大小、内边距和旋转角度。
          const rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
          codeList.push({
            code: chars.charAt(Math.floor(Math.random() * charsLen)),
            color: `rgb(${rgb})`,
            fontSize: `${10 + (+[Math.floor(Math.random() * 10)] + 6)}px`,
            padding: `${[Math.floor(Math.random() * 10)]}px`,
            transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
          })
        }
        // 指向
        this.codeList = codeList
        // 将当前数据派发出去
        // console.log(codeList.map(item => item.code).join(''))
        this.$emit('input', codeList.map(item => item.code).join(''))
      },
      getStyle (data) { // getStyle：根据 item 对象生成内联样式字符串。
        return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
      }
    }
  }
  </script>
  
<style scoped>
.ValidCode{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    user-select: none;
}
.ValidCode span{
    display: inline-block;
}
</style>
  