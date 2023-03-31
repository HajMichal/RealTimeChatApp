import axios from "axios";

const loginApi = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true,
});

interface addFriend {
    friendsName: string
    friendsId: number
    mainUserId: number
}

const addFriend = async(data: addFriend) => {
    return await loginApi.post('/addFriend', data)
}

export default addFriend