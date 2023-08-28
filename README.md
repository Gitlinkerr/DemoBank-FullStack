# DemoBank-FullStack

DemoBank serves as a simple banking platform and e-wallet, empowering users to transfer funds, make deposits, and more.
I Dived into this project to get a better grasp on React and Redux. Given it's my first time tackling React, there might be places where the code feels a bit raw or improvised, but it gets the job done.
On the flip side, I'm better with Spring Boot, and that's what's running the show in the backend. 
The whole idea is about delivering a variety of banking features, ensuring everything's user-friendly and responsive.

![demobank_gif](demobank_gif.gif)

## Features

- User Registration: New users can sign up for an account.
- Profile Management: Users can edit their account details.
- Multiple Accounts: A user can have and manage multiple banking accounts.
- Admin Features:
  - Account Deletion: Admins can delete a user's account.
  - File Access: Admins can download files uploaded by users.
  - Revoke Access: Admins have the ability to revoke a user's access while retaining the account for record-keeping.
- User Features:
  - Account Deletion: Users can delete their own account.
  - Deposit Funds: Users can deposit money into their accounts.
  - Comment Section: Users can write comments.
  - Fund Transfer: Enables users to transfer funds between accounts.
  - File Upload: Users can upload pertinent files.

# Running the DemoBank FullStack Project

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Have [Java JDK](https://www.oracle.com/java/technologies/downloads/#java17) and [Maven](https://maven.apache.org/) set up.

## Without Docker

1. **Running the Backend (Spring Boot)**: 
   ```bash
   cd backend
   ./mvnw spring-boot:run
   #On Windows: mvnw.cmd spring-boot:run
   ```
2. **Running the Frontend (React)**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

  ## With Docker
To run the project using Docker, follow these steps:

### Prerequisites

1. Ensure you have [Docker](https://www.docker.com/get-started) installed.
2. Install [docker-compose](https://docs.docker.com/compose/install/).

### Setup & Run 
First, you need to clone the repository to your local machine:
   ```bash
   git clone https://github.com/Gitlinkerr/DemoBank-FullStack.git
   cd DemoBank-FullStack
   docker-compose up --build
   ```

## Access the Application

Once the containers are up, you can access: 

- Frontend: Open your browser and navigate to http://localhost:3000 (or the port you specified in docker-compose.yml for the frontend).
- Backend: Should be running on http://localhost:8080.

 
