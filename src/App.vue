<template>
	<div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
		<nav class="uk-navbar-container uk-navbar-primary uk-text-white" uk-navbar>

			<div class="uk-navbar-left">
				<router-link :to="{ name: 'tasks' }" custom v-slot="{ navigate }">
					<a class="uk-navbar-item uk-logo" href="#" @click="navigate">Freelance</a>
				</router-link>
			</div>

			<div class="uk-navbar-right">
				<ul class="uk-navbar-nav">
					<nav-link :to="{ name: 'tasks' }">Все задачи</nav-link>
					<nav-link :to="{ name: 'tasks-new' }">Создать</nav-link>
				</ul>
			</div>
		</nav>
	</div>
	
	<div class="uk-container uk-flex uk-flex-column">
		<router-view></router-view>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import NavLink from '@/components/NavLink'

export default {
	setup() {
		useStore().dispatch('tasks/fetchAll')
		return { }
	},

	components: { NavLink }
}
</script>

<style>
.uk-navbar {
	background: #0f6ecd !important;
	margin-bottom: 50px;
}
.uk-logo, .uk-navbar-nav>li.uk-active>a, .uk-navbar-nav>li>a {
	color: white !important;
}

.uk-navbar-nav>li.uk-active>a {
    text-decoration: underline;
}
.uk-label {
	height: 22px;
}
.uk-button-primary {
	border: unset !important;
}
</style>
