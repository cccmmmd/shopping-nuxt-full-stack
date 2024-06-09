<script lang="ts" setup>
defineProps(["product"]);

const user = useSupabaseUser();
const cart = useCart();
const alreadyInCart = (cartState, productToCheck) => {
	return cartState.some((pc) => {
		return pc.id === productToCheck.id;
	});
};

const getRandomRating = () => {
	return Math.floor(Math.random() * 5) + 1;
};

const addToCart = (product) => {
	// cart.value.push(product)
	if (user.value) {
		cart.value.push(product);
	} else {
		alert("請先登入！");
	}
};
</script>

<template>
	<div :id="`productcomp${product.id}`">
		<div
			class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
		>
			<NuxtLink :to="`product-${product.id}`">
				<img
					class="p-8 rounded-t-lg"
					:src="`${product.image}`"
					alt="product image"
				/>
			</NuxtLink>
			<div class="px-5 pb-5 dark:text-white">
				<NuxtLink class="block mb-3" :to="`product-${product.id}`">
					<h5
						class="text-2xl font-semibold tracking-tight text-blue-800"
					>
						{{ product.title }}
					</h5>
				</NuxtLink>
				<div>
					USD
					<span
						class="text-3xl font-bold text-gray-900 dark:text-white"
						>${{ product.price }}</span
					><br />
					<span class="text-gray-500"
						>Original price: USD
						<span class="text-xl font-bold line-through">
							${{ product.price * 1.5 }}</span
						></span
					>
				</div>
				<div class="flex items-center mt-2.5 mb-5 dark:text-white">
					<h5>Rating:</h5>
					<span
						class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3"
						>{{ getRandomRating() }}</span
					>
				</div>

				<NuxtLink :to="`product-${product.id}`">
					<p class="mb-3 text-gray-500 dark:text-gray-400 truncate">
						{{ product.description }}
					</p>
				</NuxtLink>

				<div class="flex items-center justify-end">
					<button
						v-if="alreadyInCart(cart, product) && user"
						class="text-white bg-gray-400 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>
						<span class="text-xl font-bold dark:text-white"
							>Item Added</span
						>
					</button>
					<button
						v-else
						@click="addToCart(product)"
						class="text-white bg-yellow-400 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					>
						<span class="text-xl font-bold dark:text-white"
							>Add to Cart</span
						>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
