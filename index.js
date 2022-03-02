import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import Discussions from './models/Discussions.js';

import authRoutes from './routes/users.js';
import ideaRoutes from './routes/ideas.js';
import discussionRoutes from './routes/discussions.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'PATCH'],
	},
});

dotenv.config();

// Connect to MongoDB
mongoose
	.connect(
		'mongodb://ZinniaGlobalConsultancy:2%40Muccinex**@localhost:27017/ZinniaGlobalConsultancy?authSource=admin',
		{
			useNewUrlParser: true,
			// useFindAndModify: true,
			useUnifiedTopology: true,
			// useCreateIndex: true,
		}
	)
	.then(() => console.log('MongoDB connected successfully!'))
	.catch((error) => console.log(error));

app.use(express.json()); // used to parse JSON bodies
app.use(express.urlencoded({ limit: '30mb', extended: true })); // parse URL-encoded bodies
app.use(cors('*'));
app.use(morgan('common'));

// Routes middleware
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/ideas', ideaRoutes);
app.use('/api/v1/discussions', discussionRoutes);

// Catch / routes
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Zinnia Global Consultancy api endpoint!' });
});

let interval;

// Run when client connects
io.on('connection', (socket) => {
	console.log('WS connected successfully...');
	if (interval) {
		clearInterval(interval);
	}
	// Welcome current user
	socket.emit('message', 'A user has joined the chat');
	getApiAndEmit(socket);

	// interval = setInterval(() => getApiAndEmit(socket), 1000);
	// Runs when client disconnects
	socket.on('disconnect', () => {
		io.emit('message', 'A user has left the chat');
		clearInterval(interval);
	});
});

export const getApiAndEmit = async (socket) => {
	const getCurrentMessage = await Discussions.findOne().sort({
		createdAt: -1,
	});
	const response = getCurrentMessage;
	// Emitting a new message. Will be consumed by the client
	socket.emit('FromAPI', response);
};

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on *:${PORT}.`));
