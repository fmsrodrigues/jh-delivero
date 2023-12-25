<p align="center">
  Delivero is a project to help an imaginary distributor manage their orders. :package: 
</p>

## Getting Started

### Docker approach  :whale:
_This method is not for development, it is built for production and can be tested with seeds that MUST be wiped in a real scenario_

To run this project you will need docker installed on your machine. If you don't have it, you can download it [here](https://www.docker.com/get-started).
After installing docker, you can clone this repository and run the following commands:

```bash
docker-compose up -d
```

This command will create a container with the frontend, another with the backend and another container with the database. After that you may run the seeds command to populate the database with some data:

First you need to create the `.env` file in the backend folder. You can copy the `.env.example` file and rename it to `.env`. After that you can run the following command:

```bash
npm run seeds
```

After that you can access the frontend at `http://localhost:80` and the backend at `http://localhost:3333`.

### Development approach

To run this project you will need to have [Node.js](https://nodejs.org/en/) installed on your machine. After installing Node.js, you can clone this repository and create a postgreSQL database.

After creating the database, you need to create the `.env` file in the backend folder. You can copy the `.env.example` file and rename it to `.env`. After that you can run the following command in the backend folder:

```bash
npm install
npm run seeds
npm run start:dev
```

them the backend will be accessible in `http://localhost:3333`.

After that you need to create the `.env` file in the frontend folder. You can copy the `.env.example` file and rename it to `.env`, and in another terminal, you can run the following command in the frontend folder:

```bash
npm install
npm run dev
```

them the frontend will be accessible in `http://localhost:3000`.