<script setup>
    const {data: products} = await useFetch('/api/products')
</script>

<template>
    <div class="grid grid-cols-4 gap-4">
        <div v-for="pro in products">
            <ProductComp :product = "pro" />
        </div>
    </div>
</template>
