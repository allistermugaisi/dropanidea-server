import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import authRoutes from './routes/users.js';

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

// Catch / routes
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Zinnia Global Consultancy api endpoint!' });
});

// Run when client connects
io.on('connection', (socket) => {
	const id = socket.handshake.query.id;
	socket.join(id);
	console.log('New WebSocket Connection...', id);
	// Welcome current user
	socket.emit('message', 'Welcome to DropAnIdea ZinniaGlobalConsultancy');

	// Broadcast when user connects
	socket.broadcast.emit('message', 'A user has joined the chat');

	// Runs when client disconnects
	socket.on('disconnect', () => {
		io.emit('message', 'A user has left the chat');
		console.log('user disconnected');
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server listening on *:${PORT}.`));
