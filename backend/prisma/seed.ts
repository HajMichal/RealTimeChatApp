import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const michal = await prisma.user.upsert({
        where: { email: "michalhaj2003@gmail.com" },
        create: {
            email: "michalhaj2003@gmail.com",
            password: "qwerty",
            name: "Michał"
        },
        update: {}
    })

    const klaudia = await prisma.user.upsert({
        where: { email: "klaudia@gmail.com" },
        create: {
            email: "klaudia@gmail.com",
            password: "qwerty",
            name: "Klaudia"
        },
        update: {}
    })

    const bob = await prisma.user.upsert({
        where: { email: "bob@gmail.com" },
        create: {
            email: "bob@gmail.com",
            password: "qwerty",
            name: "Bob"
        },
        update: {}
    })
    console.log({ michal, klaudia, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })