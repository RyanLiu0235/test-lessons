# demo 07

这一节，我们来试着用Jest测试Vue的单文件组件。大家可以先自己看一下文件目录结构，然后自行执行一下测试命令。

``` shell
$ yarn install
$ npm run test
```

可以看到，测试结果已经出来了。

这里有一份[用Jest测试单文件组件](https://vue-test-utils.vuejs.org/zh-cn/guides/testing-SFCs-with-jest.html)的文档，但是按照这份文档来做，你几乎是不可能最终跑通测试的。但是它至少提供了大致的方向。

我们先来写一个非常基础的`button`。
``` vue
<template>
  <button class="ns-button" :size="size">{{text}}</button>
</template>
<script>
export default {
  name: 'ns-button',
  props: {
    text: {
      required: false,
      type: String,
      default: 'button'
    },
    size: {
      required: false,
      type: String,
      default: 'middle',
      validator: val => ['large', 'middle', 'small'].indexOf(val) > -1
    }
  }
}

</script>
```

## 原始写法

其实也不能称之为原始，因为很多Vue生态里的开源项目都是这么写单元测试的。

``` js
describe('components', () => {
  describe('button', () => {
    test('should have tagName `button` and default textContent `button`', () => {
      const vm = new Vue({
        template: '<ns-button></ns-button>',
        components: { NsButton }
      }).$mount()

      expect(vm.$el.tagName).toBe('BUTTON')
      expect(vm.$el.textContent).toBe('button')
    })

    test('should behave the given props', () => {
      const vm = new Vue({
        template: '<ns-button text="submit" size="large"></ns-button>',
        components: { NsButton }
      }).$mount()

      expect(vm.$el.textContent).toBe('submit')
      expect(vm.$el.getAttribute('size')).toBe('large')
    })
  })
})
```

这样的写法大致的思路就是将一个组件看成一个黑盒，我们给予它一些输入（props），它给我们生成一个组件并在页面上渲染出来。我们最后再检测生成的内容是否符合预期。

这样写是没有任何问题，但是社区里给我们提供了一个更加方便的工具集，可以让我们更加专注于测试逻辑的编写，节省很多篇幅。

## vue-test-utils

这里是[vue-test-utils的中文文档]。

在这里我想贴一下**vue-test-utils**文档里的[一段文字](https://vue-test-utils.vuejs.org/zh-cn/guides/common-tips.html)，大家也应该自己去看看原文：

>	对于 UI 组件来说，我们不推荐一味追求行级覆盖率，因为它会导致我们过分关注组件的内部实现细节，从而导致琐碎的测试。

>	取而代之的是，我们推荐把测试撰写为断言你的组件的公共接口，并在一个黑盒内部处理它。一个简单的测试用例将会断言一些输入 (用户的交互或 prop 的改变) 提供给某组件之后是否导致预期结果 (渲染结果或触发自定义事件)。

>	比如，对于每次点击按钮都会将计数加一的 Counter 组件来说，其测试用例将会模拟点击并断言渲染结果会加 1。该测试并没有关注 Counter 如何递增数值，而只关注其输入和输出。

>	该提议的好处在于，即便该组件的内部实现已经随时间发生了改变，只要你的组件的公共接口始终保持一致，测试就可以通过。

是的，我们在测试组件的时候，我们更应该专注于接口的测试。

我们来改一下我们的测试脚本。

### 组件的挂载以及渲染

``` js
import NsButton from '@/components/button'
import { mount } from '@vue/test-utils'

describe('components', () => {
  describe('button', () => {
    test('should have tagName `button` and default textContent `button`', () => {
      const wrapper = mount(NsButton)
      expect(wrapper.html()).toBe('<button size="middle" class="ns-button">button</button>')
    })

    test('should behave the given props', () => {
      const wrapper = mount(NsButton, {
        propsData: { text: 'submit', size: 'large' }
      })

      expect(wrapper.html()).toBe('<button size="large" class="ns-button">submit</button>')
    })
  })
})
```

`mount`方法直接帮我们挂载了组件。我们给了组件输入之后，再通过断言来判断组件是否发生了预期的行为。这样一来，我们的测试脚本就写完了。

### 触发事件

我们来给NsButton加上一个自定义事件。

``` vue
<template>
  <button class="ns-button" :size="size" @click="onClick">{{text}}</button>
</template>
<script>
export default {
  // ...
  data() {
    return {
      times: 0
    }
  },
  methods: {
    onClick() {
      this.times++
    }
  }
}

</script>
```

这时候，按钮被点击之后会触发一个'clicked'自定义事件，组件内部的`times`应该自增1。我们来修改一下我们的测试脚本。

``` js
test('should times++ when clicked', () => {
  const wrapper = mount(NsButton)

  wrapper.trigger('click')
  expect(wrapper.vm.times).toBe(1)
})
```
