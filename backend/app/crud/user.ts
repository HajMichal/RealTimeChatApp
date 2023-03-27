import { PrismaClient } from "@prisma/client"

const bcrypt = require("bcrypt");



const prisma  = new PrismaClient();

async function get_user_by_email(user_email: string)  {
    const user = await prisma.user.findFirst({where: {email: user_email}})

    return user
}

async function checkLogin(email: string, password: string) {
    const user = await get_user_by_email(email);
    if (user) {
        var auth = bcrypt.compare(password, user.password);

        if (await auth) return user
            else {
                throw Error("Invalid Credentials")
            }
 
    } else {
        throw Error("Invalid Credentials")
    }
}

async function getAllUsers(searchedValue?: any) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true
        },
        where: {
          name:{
            contains: searchedValue        
          }
        },
      })
      return users
}


export {
    get_user_by_email,
    checkLogin,
    getAllUsers
}
