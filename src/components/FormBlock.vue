<template>
  <form class="card card-w30" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="form.blockType">
        <option
          v-for="{ value, text } of blockTypes"
          :value="value"
          :key="value"
          >{{ text }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" v-model.trim="form.value" rows="3"></textarea>
    </div>

    <button class="btn primary" :disabled="isBtnDisabled">Добавить</button>
  </form>
</template>

<script>
export default {
  emits: {
    onAddRow: {
      form: Object
    }
  },
  data () {
    return {
      blockTypes: [
        { value: 'title', text: 'Заголовок' },
        { value: 'subtitle', text: 'Подзаголовок' },
        { value: 'avatar', text: 'Аватар' },
        { value: 'text', text: 'Текст' }
      ],
      form: {
        blockType: 'title',
        value: ''
      }
    }
  },

  computed: {
    isBtnDisabled () {
      return this.form.value.length < 4
    }
  },

  methods: {
    onSubmit () {
      if (this.isBtnDisabled) {
        return
      }

      const body = JSON.stringify(this.form)

      fetch('https://vue-course-9bd3f-default-rtdb.firebaseio.com/blocks.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
        .then(async response => {
          const { name } = await response.json()
          this.$emit('onAddRow', { id: name, ...JSON.parse(body) })
          this.form.blockType = 'title'
          this.form.value = ''
        })
        .catch(e => {
          console.log(e.message)
        })
    }
  }
}
</script>
