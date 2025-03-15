import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import { createServer } from 'node:http';
import { join } from 'path';
import { Server } from 'socket.io';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { router } from './api/routes/index.ts';

dotenv.config();

const basePath = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '';
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const port = process.env.API_PORT || 3000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Socket IO middleware
app.use((request, _response, next) => {
  request.io = io;
  next();
});

// ------ Configure swagger docs ------
const options = {
  swaggerDefinition: {
    info: {
      title: 'R Interview',
      version: '1.0.0',
      // description: "My API for doing cool stuff!",
    },
    basePath: `${basePath}api`,
  },
  apis: [join(import.meta.url, '/routes/**/*.js')],
};
const swaggerSpecs = swaggerJsdoc(options);

app.use(`${basePath}/api`, router);
app.use(`${basePath}/swagger`, serve, setup(swaggerSpecs));

io.on('connection', (socket) => {
  console.log('user connected', socket);
});

server.listen(port, () => {
  console.log(`App running at http://localhost:${port}${basePath}`);
});
