import { MongoConncetion } from './database/MongoConnection';
import express from 'express';
import { URLController }from './controller/URLController';

const server = express();
server.use(express.json());

const database = new MongoConncetion();
database.connect();

const urlController = new URLController();

server.post('/shorten', urlController.shorten);
server.get('/:hash', urlController.getUrl);

server.listen( 5000, () => console.log("server run"));