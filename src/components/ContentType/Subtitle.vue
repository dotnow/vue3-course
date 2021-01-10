<template>
  <h2><slot></slot>{{ value }}</h2>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
