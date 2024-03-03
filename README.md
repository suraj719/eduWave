# eduWave 
## Introduction
Introducing eduWave: an innovative solution at the intersection of technology and mindfulness, designed to revolutionize education. By empowering teachers with interactive course design tools and providing students with customizable study environments, eduWave enhances focus and engagement in learning. Through features like distraction-blocking applications and gamified learning platforms, we aim to cultivate a conducive learning environment. Join us in shaping the future of education with eduWave.
```
access our app at https://edu-wave.vercel.app
```
## Installation
Clone my repository
```
  git clone https://github.com/suraj719/eduWave.git
```
add a .env file with the below config in the root directory
```
REACT_APP_BACKEND_URL = "http://localhost:5001"
REACT_APP_CHAT_API_KEY = "open ai api key"
REACT_APP_API_KEY = "firebase config"
REACT_APP_AUTH_DOMAIN = "firebase config"
REACT_APP_PROJECT_ID = "firebase config"
REACT_APP_STORAGE_BUCKET="firebase config"
REACT_APP_MESSAGING_SENDER_ID = "firebase config"
REACT_APP_APP_ID = "firebase config"
```
add another .env with the below config in the ```server``` directory
```
MONGO_URL = ""
jwt_secret = "
clientId = "client id of gcp"
clientSecret = "client secret of gcp"
refreshToken="refresh token you get from the OAuth playground"
```
install the dependencies for both client and server
```
  npm install
  npm start
```
```
  cd server
  npm install
  npm start
```
```
now, you can view the app at http://localhost:3000
```
```
you can access the backend APIs at http://localhost:5001
```