# morality-survey

## Summary

For this Single Page morality survey application:

1. As soon as you open the UI, it prompts you to start taking the survey. However, in the navigation bar there is an option to 'Download Responses' which allows you to download the survey responses so far. 
2. A user has to answer 10 questions which are randomly selected from the pack of 36 questions given in the csv link. The options are range from 'Strongly Agree' to 'Strongly Disagree' as per the instructions. 
4. Each question has a timer associated with it and as soon as the user moves on to the next question, the timer is reset. 
5. End User is deliberately kept anonymous i.e. for each user a specific uuid is assigned but it can in no way be used to identify the user who took the survey. 
6. When the user downloads the responses, they can view the Serial number, questions, answers, and their respective time taken. 

## DB Design 

1. I have created a Mongo Atlas instance on Cloud and I am accessing it through Mongo Compass on my local system. 
2. I have a Database called 'morality-survey' with 2 collections:
       - 'questions' which contains all the information from the csv file given to us
       - 'submissions' which is empty initially but is populated as the users submit their responses to the survey. It contains the following fields: 'id', 'question_id', 'answer', 'time_taken' in seconds, 'uuid'. 


## Tech Stack Used:

```
Front-end - Vite, react.js, BootStrap
Resource Manager - yarn
Backend - express, node.js
Database - MongoDB (Atlas instance and managed by Mongo Compass on local system)
```

## Install dependencies

```
yarn
```

## Run Backend

```
cd packages/morality-backend
yarn start
```

## Run Frontend

```
cd packages/morality-frontend
yarn start --host
```

## View it on - localhost:5001
