# OnlineDiary

OnlineDiary is a web application that allows users to create and manage diary entries securely. This project consists of a frontend and backend component.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Create, read, update, and delete diary entries
- User authentication with JWT
- Secure data storage with MongoDB

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anaskhansz/OnlineDiary.git
   ```

#installing frontend dependencies
cd OnlineDiary/frontend
npm install

#installing backend dependencies
cd ../backend
npm install

#start backened server
cd backend
npm start
#start frontend server
cd ../frontend
npm start

#env variables

PORT=
MONGO_URL=
JWT_SECRET=
JWT_EXPIRATION_TIME=
