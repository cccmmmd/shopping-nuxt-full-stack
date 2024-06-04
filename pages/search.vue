<script  setup>
    const searchWord = useState(() => null)
    const searcResults = useState(() => null)

    const searchFunc = async () => {
        const {data} = await useFetch('/api/products/search/query', {
        // immediate: false,
        query: {
            input: searchWord.value
        },
        transform: data => {
            searcResults.value = data
        }
    })
    }
   

</script>

<template>
    <div class="p-8">
        <div class="text-center mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">輸入想搜尋的產品名稱</div>
        <form @submit.prevent="searchFunc" class="max-w-md mx-auto mb-16">   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input v-model="searchWord" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for any product..." required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>

        <div v-if="searcResults">
            <div class="mb-3 text-2xl font-extrabold leading-none tracking-tight text-gray-900  dark:text-white">搜尋結果為：</div>
            <div class="grid grid-cols-4 gap-4">
            <div 
                v-for="pro in searcResults ">
                <ProductComp :product = "pro" />
            </div>
        </div>
        </div>
        
        <div v-if="searcResults && !searcResults.length">
                <div class="text-center mb-8 text-2xl font-extrabold leading-none tracking-tight text-gray-300  dark:text-white">沒有結果</div>
            </div>
    </div>
</template>
