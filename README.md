# Campaign API

A RESTful API for managing campaigns, built with NestJS, TypeORM, Postgres, and Docker.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Tests](#tests)
- [API Endpoints](#api-endpoints)

## Introduction

The Campaign API allows for the management of marketing campaigns, providing endpoints for creating, reading, updating, and deleting (soft delete) campaigns.

## Features

- Create a campaign
- Read all campaigns
- Read a specific campaign by ID
- Update a campaign
- Soft delete a campaign

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/campaign-api.git
   cd campaign-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the application:

   ```bash
   npm run build
   ```

4. Create a `.env` file based on the `.env.example`:

   ```env
   DATABASE_HOST=postgres
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_NAME=campaign_db
   ```

5. Build and start the Docker containers:

   ```bash
   docker-compose up --build
   ```

## Usage

Once the Docker containers are up and running, the API will be available at `http://localhost:3000/api`.

### Running the Application with NPM

1. Before starting the docker-compose, update the DATABASE_HOST variable in the `.env ` file:

   ```env
   DATABASE_HOST=localhost
   ```

2. Then, you will need to update the `docker-compose.yml` file, commenting the `app` section:

   ```yml
   # app:
   #   build: .
   #   command: npm run start:dev
   #   volumes:
   #     - .:/usr/src/app
   #     - /usr/src/app/node_modules
   #   ports:
   #     - '3000:3000'
   #   depends_on:
   #     - postgres
   ```

3. Start the PostgreSQL database using Docker Compose:

   ```bash
   docker-compose up --build
   ```

4. And start the NestJS app:

   ```bash
   npm run start:dev
   ```

## Tests

Once the dependencies are installed, you can run the application tests:

```bash
npm run test
```

## API Endpoints

The documentation is available in `http://localhost:3000/swagger`

### Create a Campaign

- **URL:** `/api/campaigns`
- **Method:** `POST`
- **Request Body:**

  ```json
  {
    "name": "Campaign Name",
    "startDate": "2024-07-14T00:00:00.000Z",
    "endDate": "2024-08-14T00:00:00.000Z",
    "status": "active",
    "category": "Category"
  }
  ```

### Read All Campaigns

- **URL:** `/api/campaigns`
- **Method:** `GET`

### Read a Campaign by ID

- **URL:** `/api/campaigns/:id`
- **Method:** `GET`

### Update a Campaign

- **URL:** `/api/campaigns/:id`
- **Method:** `PUT`
- **Request Body:** (update)

  ```json
  {
    "name": "Updated Campaign",
    "startDate": "2024-07-14T00:00:00.000Z",
    "endDate": "2024-08-14T00:00:00.000Z",
    "status": "active",
    "category": "Category"
  }
  ```

### Soft Delete a Campaign

- **URL:** `/api/campaigns/:id`
- **Method:** `DELETE`

Feel free to customize this README to better fit your project details and requirements.
