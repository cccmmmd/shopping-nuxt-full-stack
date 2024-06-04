<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const successMsg = useState(() => null)
    const errorMsg = useState(() => null)

    const logout = async() => {
        const {error} = await supabase.auth.signOut()
        if(error) {
            successMsg.value = null
            errorMsg.value = error.message
        }
        successMsg.value = 'Hope to see you again soon ! Redirecting ...'
        errorMsg.value = null
        setTimeout(async () => {
            successMsg.value = null
            await navigateTo('/')
        }, 1000)

    }

    definePageMeta({
        middleware: [
            async () => {
                const user = useSupabaseUser()
                if(!user.value) await navigateTo('/login')
            }
        ]
    })
</script>

<template>
    <div class="p-20 text-center">
        <h1 class="mb-[60px] text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Are you sure you wanna logout?</h1>
        <NuxtLink @click="logout()" class=" cursor-pointer mb-12  md:mr-10  inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-800 dark:text-white rounded-lg hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900  md:mb-20">
            Yes, log me out
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </NuxtLink>
        <NuxtLink to="/" class="md:ml-10 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-600 dark:text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 ">
            Umm... Go back to Home page
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
        </NuxtLink>
         <!-- success -->
         <div v-if="successMsg">
            <p id="filled_success_help" class="mt-2 text-xs text-green-600 dark:text-green-400"><span class="font-medium">Well done! </span> {{ successMsg }}</p>
        </div>
         <!-- fail -->
         <div v-if="errorMsg">
            <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Oh, snapp! </span> {{ errorMsg }}</p>
        </div>
    </div>
</template>
