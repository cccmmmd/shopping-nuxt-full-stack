<script setup>
    const user = useSupabaseUser()
    const {data: products} = await useFetch('/api/products')
</script>

<template>
    <div>
        <div class="text-center mb-8 text-4xl font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r to-purple-800 from-red-500">
            <div class="mb-3" v-if="user">Hello! {{ user.user_metadata.full_name }}</div>
            玲瑯滿目！挑選你喜歡的商品！</div>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="pro in products">
                <ProductComp :product = "pro" />
            </div>
        </div>
    </div>
    
</template>
