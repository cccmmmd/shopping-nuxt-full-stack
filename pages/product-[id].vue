<script setup>
    const route = useRoute()
    const id = route.params.id
    const router = useRouter()

    const { data, pending } = await useFetch(event => {
        return `api/products/find-product/${id}`
    }, {
        lazy: true
    })

    const user = useSupabaseUser()
    const cart = useCart()
    const alreadyInCart = (cartState, productToCheck) => {
        return cartState.some((pc) => {
            return pc.id === productToCheck.id
        })
    }

    const getRandomRating = () => {
        return Math.floor(Math.random() * 5) +1
    }

    const addToCart = (product) => {
        // cart.value.push(product)
        if(user.value) {
            cart.value.push(product)
        }else{
            alert(" Please Login first !")
        }
    }
</script>

<template>
    <div>
        <Loading v-if="pending"/>
        <div v-else>
            <div>
                <div class="max-w-4xl mx-auto bg-white rounded-lg shadow dark:bg-gray-800 p-5">
                    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mb-2" @click="$router.back()">Back</button>
                    <div class="flex">
                        <div class="max-w-sm mx-auto">
                            <img class="p-8 rounded-t-lg" :src="`${data.image}`" alt="product image" />
                        </div>
                    </div>
                    <div class="pb-5 dark:text-white">
                        <div class="block mb-3">
                            <h5 class="text-2xl font-semibold tracking-tight text-blue-800 ">{{ data.title }}</h5>
                        </div>
                        <div>USD$
                        <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ data.price }}</span><br/>
                        <span class="text-gray-500">Original price: USD$
                        <span class="text-xl font-bold line-through"> {{ data.price * 1.5 }}</span></span> 
                    </div>
                        <div class="flex items-center mt-2.5 mb-5 dark:text-white">
                        <h5> Rating: </h5>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{{ getRandomRating() }}</span>
                        </div>
                    
                        <div>
                        <p class="mb-3 text-gray-500 dark:text-gray-400">{{ data.description }}</p>
                        </div>
                        
                        <div class="flex items-center justify-end">
                            <button @click="addToCart(product)" class="text-white bg-yellow-400 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <span v-if="alreadyInCart(cart, product) && user" class="text-xl font-bold  dark:text-white">Item Added</span>
                                <span v-else class="text-xl font-bold  dark:text-white">Add to Cart</span>
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>
