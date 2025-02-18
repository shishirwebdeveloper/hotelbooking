import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { bookingRoutes } from './routes/bookingRoutes';

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', bookingRoutes);

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
