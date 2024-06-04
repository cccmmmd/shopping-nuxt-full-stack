import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default defineEventHandler( async event => {
    const query = getQuery(event)
    const {title, description, category, price, image } = query

    let newProduct

    try {
        newProduct = await prisma.products.create({
            data: {
                title,
                description,
                price: parseInt(price),
                category,
                image
            }
        })
    } catch(error){
        console.error(err)
    } finally {
        await prisma.$disconnect()
    }

    return newProduct
})