<template>
  <slot></slot>
  <div class="avatar">
    <img :src="value" alt="Avatar">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
      validator (url) {
        try {
          return !!new URL(url)
        } catch (e) {
          return false
        }
      }
    }
  }
}
</script>

<style>
  .avatar {
    display: flex;
    justify-content: center;
  }

  .avatar img {
    width: 150px;
    height: auto;
    border-radius: 50%;
  }
</style>
