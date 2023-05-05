
# Audio Transcription API using Google Cloud Speech-to-Text

### Live Website: https://audioaccuracy.vercel.app/

## Project Description:

    This project is a simple RESTful API that allows users to upload audio files and transcribe them using Google Cloud Speech-to-Text service. The API receives an audio file and returns a transcription of the content. The project is built with Node.js, Express, and Google Cloud Speech-to-Text API.

## Table of Contents
    1. Requirements
    2. Installation
    3. Usage
    4. API Endpoints
    5. Contributing
    6. License

## Requirements

    Node.js v14.x or later
    Google Cloud Platform account with Speech-to-Text API enabled
    Google Cloud SDK (gcloud) installed and configured


## Run Locally

Clone the project

```bash
  git clone https://github.com/Priyanshu9898/PlayPower-Labs-Assignment
```

Go to the project directory

```bash
  cd PlayPower-Labs-Assignment
```

Go to the frontend directory and Install dependencies

```bash
  cd frontend
```
```bash
  npm install
```

Go to the backend directory and Install dependencies

```bash
  cd backend
```
```bash
  npm install
```


Set up Google Cloud authentication:

    Download the JSON key file from Google Cloud Console for your service account.

    Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the path of the JSON key file. For example, on Linux or macOS:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"
```
Or on Windows (PowerShell):
```bash
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\path\to\your\keyfile.json"
```

## Usage

Start the frontend server

```bash
  npm start
```


Start the backend server

```bash
  npm run dev
```

## Environment Variables

`PORT`: PORT number


## Tech Stack

**Client:** React, react-bootstrap, tsparticles

**Server:** Node, Express

**Database:** MongoDB


## API Reference

#### Get all items

```http
  POST /api/v1/transcribe
```
Upload an audio file and receive a transcription of the content.

Request:
Content-Type: multipart/form-data


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `binary` | **Required**. The audio file |


Response: Content-Type: application/json


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `transcription`      | `string` | **Required**. The transcribed text of the audio |


## Screenshots

![App Screenshot 1](https://i.postimg.cc/qR1sfW0y/React-App-Brave-05-05-2023-15-27-25.png)

![App Screenshot 2](https://i.postimg.cc/hvh9KMPw/React-App-Brave-05-05-2023-15-27-40.png)

![App Screenshot 3](https://i.postimg.cc/LhKhGVqj/React-App-Brave-05-05-2023-15-27-53.png)

![App Screenshot 4](https://i.postimg.cc/661rMsMN/React-App-Brave-05-05-2023-15-27-59.png)



## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)





## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/Priyanshu9898/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/priyanshumalaviya/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Priyanshu2281)
[![Medium](https://img.shields.io/badge/medum-1DA1F2?style=for-the-badge&logo=medium&logoColor=black)](https://medium.com/@priyanshumalaviya9210)

## Demo

Insert gif or link to demo


## License

[MIT](https://choosealicense.com/licenses/mit/)

