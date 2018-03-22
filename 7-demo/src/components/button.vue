<template>
  <button class="ns-button"
    :size="size">{{text}}</button>
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
