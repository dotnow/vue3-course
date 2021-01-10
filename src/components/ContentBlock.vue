<template>
    <div class="card card-w70">
      <component
        :is="`content-type-${blockType}`"
        v-for="({blockType, value }, idx) of content"
        :key="idx"
        :value="value"
      >{{ value }}</component>
    </div>
</template>

<script>
import ContentTypeText from './ContentType/Text'
import ContentTypeTitle from './ContentType/Title'
import ContentTypeAvatar from './ContentType/Avatar'
import ContentTypeSubtitle from './ContentType/Subtitle'
export default {
  props: {
    content: {
      type: Array,
      required: true
    }
  },

  components: { ContentTypeTitle, ContentTypeSubtitle, ContentTypeAvatar, ContentTypeText }
}
</script>
