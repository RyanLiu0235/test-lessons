<template>
  <button class="ns-button"
    :size="size"
    @click="onClick">{{text}}</button>
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
  },
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
