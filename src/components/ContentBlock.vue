<template>
    <div class="card card-w70">
      <h3 v-if="!content.length">Добавьте первый блок, чтобы увидеть результат</h3>
      <component
        :is="`content-type-${blockType}`"
        v-for="({ blockType, value, id }) of content"
        :key="id"
        :value="value"
      >
      <button class="btn danger small" @click="$emit('onRemoveRow', id)">Remove</button>
      </component>
    </div>
</template>

<script>
import ContentTypeText from './ContentType/Text'
import ContentTypeTitle from './ContentType/Title'
import ContentTypeAvatar from './ContentType/Avatar'
import ContentTypeSubtitle from './ContentType/Subtitle'
export default {
  emits: ['onRemoveRow'],
  props: {
    content: {
      type: Array,
      required: true
    }
  },
  components: { ContentTypeTitle, ContentTypeSubtitle, ContentTypeAvatar, ContentTypeText }
}
</script>

<style>
.btn.small {
  font-size: 10px;
  padding: 5px;
  float: right;
}
</style>
