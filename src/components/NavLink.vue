<template>
    <router-link :to="to" custom v-slot="{ navigate, isActive }">
        <li @click="navigate" :class="{ 'uk-active': isActive }">
            <a href="#">
                <slot></slot>
            </a>
        </li>
    </router-link>
</template>

<script>
export default {
    props: ['to']
}
</script>