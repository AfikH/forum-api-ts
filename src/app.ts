import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/user.route';
import categoryRoutes from './routes/category.route';

mongoose.connect(`${process.env.MONGO_URI}/forum-api-ts`)
.then(() => {
    console.log('Connected to database !');
}).catch(error => {
    console.log(`Could not connect to database: ${error}`);
});

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/category', categoryRoutes);

app.listen(process.env.PORT, () => console.log(`App is running on port: ${process.env.PORT}`));