<script setup>
const user = useSupabaseUser();
</script>

<template>
	<div class="sticky top-0 z-10">
		<PublicNav v-if="!user" />
		<UserNav v-else />
	</div>
</template>
