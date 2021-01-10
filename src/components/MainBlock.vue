<template>
  <div class="container column">
    <form-block @onAddRow="onAddRow"></form-block>
    <content-block :content="content"></content-block>
  </div>
</template>

<script>
import FormBlock from './FormBlock'
import ContentBlock from './ContentBlock'

export default {
  data () {
    return {
      content: []
    }
  },

  methods: {
    onAddRow (row) {
      this.content.push(row)
    }
  },
  components: { FormBlock, ContentBlock }
}
</script>
