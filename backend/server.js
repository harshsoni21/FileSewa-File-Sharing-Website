import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import filerouter from "./routes/files.js";
import showRouter from "./routes/show.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const app = express();
const PORT = 3000;
connectDB();

// Create __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/files', filerouter);
app.use('/files', showRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
