import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
	const pdid = getRouterParam(event, "id");
	const product = await prisma.products.findFirst({
		where: {
			id: Number(pdid),
		},
	});
	return product;
});
