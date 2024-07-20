import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';
import filerouter from "./routes/files.js";
import showRouter from "./routes/show.js";
import downloadRoute from "./routes/download.js"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PORT_ADDRESS } from "./private/doc.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = PORT_ADDRESS || 3000;
connectDB();
app.use(express.static('public'))
app.use(express.json());

const corsOption = {
    origin : ["http://localhost:3000","http://localhost:8080"]
}

app.use(cors(corsOption));

// Create __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/files', filerouter);
app.use('/files', showRouter);
app.use('/files/download',downloadRoute);
app.use('api/files',filerouter);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
