import 'dotenv/config';
import express from 'express';

const app = express();



app.listen(process.env.PORT, () => console.log(`App is running on port: ${process.env.PORT}`));