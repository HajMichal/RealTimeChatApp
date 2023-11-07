# Real time chat app

<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif" alt="🚀" width="175" height="175">

Deployed app is not working because I can't find good and free hosting for my backend side.
You can install it localy or watch workflow below.

What you can do in my chatApp:
* create new account or log into an existing one.
* invite your friends
* start chatting with your friends
* remove friend from friends list

## 🎨 Colors 

| Color           | Hex                                                                  |
| --------------- | -------------------------------------------------------------------- |
| Brand Color     | ![#37A778](https://via.placeholder.com/15/37A778/37A778.png) #37A778 |
| Dark Color      | ![#111827](https://via.placeholder.com/15/111827/111827.png) #111827 |
| Mid Color       | ![#B5BBC7](https://via.placeholder.com/15/B5BBC7/B5BBC7.png) #B5BBC7 |
| Light Color     | ![#F8FAFC](https://via.placeholder.com/15/F8FAFC/F8FAFC.png) #F8FAFC |

## 📔 Development
It may works slowly on production but localy it works great


```bash
git clone https://github.com/MichalBrx/RealTimeChatApp.git
```
You have to add those variables during deployment in Railway.
* DATABASE_URL = "URL from PlanetScale"
* ACCESS_TOKEN_SECRET = 'example token'
* REFRESH_TOKEN_SECRET = 'example token'

```bash

cd backend

npm install

cd app

npx nodemon index.ts
```
```bash
cd frontend

npm install

npm run dev
```

Example workflow:
https://github.com/HajMichal/RealTimeChatApp/assets/92325569/fbbcc4bd-4a84-4464-b78b-ac17c5c825af

<br/>

## 📝 Description

Developed a Real-Time Chat Application that instant messaging with user-friendly interface. This project challenged me with implementing Websockets for real-time communication. I utilized Mantine and DaisyUI components for an engaging frontend, while the backend relied on Express with Prisma for data management. The frontend was built using React with React Query for efficient data handling. This project showcases my ability to work with modern web technologies and handle complex challenges, particularly in the realm of real-time communication.

<br/>
<br/>

Check it out!

<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.gif" alt="🌟" width="32" height="32">

Leave a star if you like it 





