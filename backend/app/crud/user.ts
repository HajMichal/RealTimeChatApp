import prisma from "./prisma";
const bcrypt = require("bcrypt");

async function get_user_by_email(user_email: string) {
  const user = await prisma.user.findFirst({ where: { email: user_email } });
  
  return user;
}

async function getUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, friendQueue: { select: { friendId: true } }, friends: { select: { friendsId: true } } },
  });
}

async function checkLogin(email: string, password: string) {
  const user = await get_user_by_email(email);
  if (user) {
    var auth = await bcrypt.compare(password, user.password);

    if (auth) return user;
    else {
      throw Error("Invalid Password");
    }
  } else {
    throw Error("Invalid E-mail");
  }
}
async function registerUser(name: string, email: string, password: string){
  if(await get_user_by_email(email)) throw new Error("Already exists")
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
}

async function getAllUsers(searchedValue?: string) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
    where: {
      name: {
        contains: searchedValue
      },
    },
    take: 4
  });
  return users;
}

export { get_user_by_email, getUserById, checkLogin, registerUser, getAllUsers };
