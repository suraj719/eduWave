# eduWave 
## Introduction
Introducing eduWave: an innovative solution at the intersection of technology and mindfulness, designed to revolutionize education. By empowering teachers with interactive course design tools and providing students with customizable study environments, eduWave enhances focus and engagement in learning. Through features like distraction-blocking applications and gamified learning platforms, we aim to cultivate a conducive learning environment. Join us in shaping the future of education with eduWave.
```
access our app at https://edu-wave.vercel.app
```
## Features
## Teacher Side Features:
1. **Student Management:**
   - Create and manage student login credentials.
   - Organize student profiles and access.

2. **Task Management:**
   - Maintain to-do lists for assignments, tasks, and deadlines.
   - Set reminders and notifications for upcoming events.

3. **Resource Sharing:**
   - Share educational materials, documents, and resources with students.
   - Upload files, links, and multimedia content for easy access.

4. **Interactive Learning:**
   - Conduct live video conferences for interactive teaching.
   - Engage students in real-time discussions, Q&A sessions, and lectures.

5. **Assessment and Progress:**
   - Create and manage quizzes, tests, and assessments.
   - View detailed statistics and analytics on student performance.

6. **Engagement and Motivation:**
   - Showcase leaderboards to encourage healthy competition.
   - Recognize student achievements and progress publicly.

## Student Side Features:
1. **Task Management and Planning:**
   - Maintain personal to-do lists for study tasks and assignments.
   - Organize schedules and deadlines for better time management.

2. **Personalized Learning Paths:**
   - Explore custom learning paths based on interests and goals.
   - Access recommended study materials and resources.

3. **Interactive Canvas Board:**
   - Engage in interactive learning activities on a virtual canvas.
   - Collaborate with peers and teachers on group projects and discussions.

4. **Assessment and Practice:**
   - Attempt quizzes and assessments for self-assessment and practice.
   - Receive instant feedback and results to track progress.

5. **Subject-Based Statistics:**
   - View detailed statistics on performance in various subjects.
   - Identify strengths and weaknesses to focus on improvement areas.

6. **ChatAI for Reference:**
   - Utilize an AI-powered chatbot for quick answers and reference.
   - Access instant explanations, definitions, and study tips.

7. **Motivation and Engagement:**
   - Participate in leaderboards to track personal progress.

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
