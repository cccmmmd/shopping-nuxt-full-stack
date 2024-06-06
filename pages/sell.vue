<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    
    if(!user.value) await navigateTo("/login")

    const title = useState(()=> null) 
    const category = useState(()=> null) 
    const price = useState(()=> null) 
    const description = useState(()=> null) 
    const image = useState(()=> null) 
    const imagesuccess = useState(()=> null) 
    const imageerror = useState(()=> null) 
    const submitsuccess = useState(()=> null) 
    const submiterror = useState(()=> null) 
    const uploadedimgurl = useState(()=> null)

    const handleFileChange = event => {
        image.value = event.target.files[0]
    }

    const uploadImage = async () => {
        if(!image.value) {
            alert("請選擇上傳的圖片")
            return
        }

        const imgtemp = image.value

        try{
            const {data, error} = await supabase.storage.from('images').upload(`public/${imgtemp.name}`, imgtemp, {
                cacheControl: '3600',
                upsert: false

            })
            if(data){
                imagesuccess.value = '上傳成功！' 
                imageerror.value = null
                const {data} = await supabase.storage.from('images').getPublicUrl(`public/${imgtemp.name}`)
                uploadedimgurl.value = data.publicUrl
            }
            if(error){
                imagesuccess.value = null
                imageerror.value = error.message
                return
            }
        } catch(error) {
            imagesuccess.value = null
            imageerror.value = error.message
        }
    }
    
    const createProduct = async () => {
        
        if(!uploadedimgurl.value){
            alert('請先上傳商品圖片')
            return
        }
        
        const {data, error} = await useFetch('/api/products/create-product', {
            query: {
                title: title,
                description: description,
                image: uploadedimgurl,
                category: category,
                price: price
            },
            watch: false
        })
       
        if(error.value) {
            submitsuccess.value = null
            submiterror.value = '建立失敗'
            return
        }
        
        submitsuccess.value = '商品建立成功！ Redirecting ... '
        submiterror.value = null
       
        const productId = data.value.id

        setTimeout(async ()=>{
            await navigateTo(`/product-${productId}`)
            uploadedimgurl.value = null
        },1000)
    }

    const cleanEvery = () => {
        title.value = null 
        category.value = null 
        price.value = null 
        description.value = null 
        image.value = null 
        uploadedimgurl.value = null
        imagesuccess.value = null 
        imageerror.value = null 
        submitsuccess.value = null 
        submiterror.value = null 
    }
 
    onMounted(() => {
        cleanEvery()
    })
</script>

<template>
    <form class="max-w-xl mx-auto mb-11">
        <div class="mb-5">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
            <input v-model="title" type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
            <input v-model="category" type="text" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
            <input v-model="price" type="text" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div class="mb-5">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
            <textarea v-model="description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description..."></textarea>
        </div>

        <div class="mb-5 mb-10">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload a product image</label>
            
            <input @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" required>
            <div class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A gooe product image let you sell more !</div>
            <br/>
            <button @click="uploadImage" type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800 me-2 mb-2">Upload image</button>
            <!-- success -->
            <div v-if="imagesuccess">
                <p id="filled_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> {{ imagesuccess }}</p>
            </div>
            <!-- fail -->
            <div v-if="imageerror">
                <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh, snapp!</span> {{ imageerror }}</p>
            </div>
        </div>
        

        <div class=" flex justify-between">
            <button @click="cleanEvery" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mb-2">Reset</button>
            
            <button type="button" @click="createProduct" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2 mb-2">Create product</button>
            
        </div>
        <div>
            <!-- success -->
            <div v-if="submitsuccess">
                <p id="filled_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done!</span> {{ submitsuccess }}</p>
            </div>
            <!-- fail -->
            <div v-if="submiterror">
                <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh, snapp!</span> {{ submiterror }}</p>
            </div>
        </div>
    </form>
</template>
