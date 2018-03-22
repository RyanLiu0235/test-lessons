import NsButton from '@/components/button'
import Vue from 'vue'

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
