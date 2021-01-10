<template>
  <div class="container">
    <p v-if="!comments.length">
      <button class="btn primary" @click="onLoadComments">Загрузить комментарии</button>
    </p>

    <div class="card" v-if="comments.length">
      <h2>Комментарии ({{ comments.length }})</h2>
      <ul class="list">
        <li class="list-item" v-for="{ email, body, id } of comments" :key="id">
          <div>
            <p><strong>{{ email }}</strong></p>
            <small>{{ body }}</small>
          </div>
        </li>
      </ul>
    </div>

    <div class="loader" v-else-if="isLoading"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      comments: []
    }
  },
  methods: {
    onLoadComments () {
      this.isLoading = true
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=15', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async response => {
          this.comments = await response.json()
        })
        .catch(e => {
          console.log(e.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
