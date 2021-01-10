<template>
  <div class="container column">
    <form-block @onAddRow="onAddRow"></form-block>
    <content-block :content="content" @onRemoveRow="onRemoveRow"></content-block>
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

  mounted () {
    fetch('https://vue-course-9bd3f-default-rtdb.firebaseio.com/blocks.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json()
        if (data) {
          this.content = Object.keys(data).map(key => ({
            id: key,
            blockType: data[key].blockType,
            value: data[key].value
          }))
        }
      })
      .catch(e => {
        console.log(e.message)
      })
  },

  methods: {
    onAddRow (row) {
      const body = JSON.stringify(row)

      fetch('https://vue-course-9bd3f-default-rtdb.firebaseio.com/blocks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
        .then(async response => {
          const { name } = await response.json()
          this.content.push({ id: name, ...JSON.parse(body) })
        })
        .catch(e => {
          console.log(e.message)
        })
    },

    onRemoveRow (id) {
      fetch(`https://vue-course-9bd3f-default-rtdb.firebaseio.com/blocks/${id}.json`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          this.content = this.content.filter(row => row.id !== id)
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  },
  components: { FormBlock, ContentBlock }
}
</script>
