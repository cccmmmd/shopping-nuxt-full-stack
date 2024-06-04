import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler( async () =>{
    const products = await prisma.products.findMany({
        orderBy: {
            id: 'desc',
        }
    })

    return products
})