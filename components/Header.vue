<script setup>
    const user = useSupabaseUser()
</script>

<template>
    <div class="pb-14">
        <PublicNav v-if="!user"/>
        <UserNav v-else />
    </div>
</template>
