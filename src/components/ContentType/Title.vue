<template>
  <h1><slot></slot>{{ value }}</h1>
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
