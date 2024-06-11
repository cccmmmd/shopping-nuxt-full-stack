<script setup>
const cart = useCart();

const calcTotalCart = () => {
	let total = 0;
	if (cart.value.length) {
		cart.value.forEach((pd) => {
			total += pd.price;
		});
	}
	return total;
};

const removeProduct = (product) => {
	const index = cart.value.findIndex((item) => item.id === product.id);
	cart.value.splice(index, 1);
};

const goToCheckout = async () => {
	if (!cart.value.length) {
		alert("購物車是空的，請選購喜歡的商品！");
		return;
	}
	alert("謝謝您！目前網站只做到這，沒有後續串金流，將導回首頁.......");

	setTimeout(async () => {
		await navigateTo("/");
		cart.value = [];
	}, 1000);
};
</script>

<template>
	<div class="px-12 mt-14">
		<div class="relative overflow-x-auto min-h-64">
			<table
				class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-10"
			>
				<thead
					class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
				>
					<tr>
						<th scope="col" class="px-6 py-3">Image</th>
						<th scope="col" class="px-6 py-3">Product name</th>
						<th scope="col" class="px-6 py-3">Category</th>
						<th scope="col" class="px-6 py-3">Price</th>
						<th scope="col" class="px-6 py-3">Action</th>
					</tr>
				</thead>
				<tbody v-if="cart.length > 0" v-for="pd in cart">
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
					>
						<td class="px-6 py-4">
							<img :src="pd.image" :alt="pd.name" width="50" />
						</td>
						<td
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						>
							{{ pd.title }}
						</td>
						<td class="px-6 py-4">
							{{ pd.category }}
						</td>
						<td class="px-6 py-4">${{ pd.price }}</td>
						<td class="px-6 py-4">
							<button class="p-2" @click="removeProduct(pd)">
								<Icon name="fa:remove" size="20" color="red" />
							</button>
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
					>
						<td class="px-6 py-4"></td>
						<td
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
						></td>
						<td class="px-6 py-4">目前沒有選購商品</td>
						<td class="px-6 py-4"></td>
						<td class="px-6 py-4"></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex justify-end mb-12">
			<div
				class="grow max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			>
				<h5
					class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
				>
					Total
				</h5>
				<div
					class="mb-3 font-normal text-gray-700 dark:text-gray-400 flex justify-end"
				>
					USD$ {{ calcTotalCart() }}
				</div>
				<div class="flex justify-end">
					<button
						@click="goToCheckout"
						class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Checkout
						<svg
							class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
