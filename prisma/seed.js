import {PrismaClient} from '@prisma/client'
import {$fetch} from 'ofetch'

const prisma = new PrismaClient()
const ProductsURL = 'https://fakestoreapi.com/products'
const products = await $fetch(ProductsURL)

const seedProducts = async () => {
    try {
        products.forEach(async pro => {
            await prisma.products.create({
                data: {
                    title: pro.title,
                    description: pro.description,
                    image: pro.image,
                    category: pro.category,
                    price: pro.price
                }
            })

        })
    } catch(err){
        console.error(err)
    } finally {
        await prisma.$disconnect()
    }
}

seedProducts()