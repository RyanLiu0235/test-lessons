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

    test('should times++ when clicked', () => {
      const wrapper = mount(NsButton)

      wrapper.trigger('click')
      expect(wrapper.vm.times).toBe(1)
    })
  })
})
