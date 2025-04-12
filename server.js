// packages
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
//import cookieParser from 'cookie-parser';
//import url, { fileURLToPath } from 'url';
//import { v2 as cloudinary } from 'cloudinary';
//import ImageKit from 'imagekit';
// db
import connectMongoDB from './db.js';
// routes
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

// lib configs
/*cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET,
});*/
/*const imagekit = new ImageKit({
	urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});*/

const app = express();
const port = process.env.PORT || 5000;

// for build stuff
/*const __filename = fileURLToPath(import.meta.url);
console.log(import.meta.url);
const __dirname = path.dirname(__filename);*/

app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));

//app.use(express.json());
// for cloudinary limit
/*app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());*/

app.get('/', (req, res) => {
  res.send('Hello from the backend.');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// for build stuff
/*app.use(express.static(path.join(__dirname, '../<frontend>/dist')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../<frontend>/dist', 'index.html'));
});*/

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
	connectMongoDB();
});