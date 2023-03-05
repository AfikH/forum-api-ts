import 'dotenv/config';
import express from 'express';

import userRoutes from './routes/user.route';

const app = express();

app.use('/user', userRoutes);

app.listen(process.env.PORT, () => console.log(`App is running on port: ${process.env.PORT}`));