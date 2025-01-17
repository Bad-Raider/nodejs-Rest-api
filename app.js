import express, { json } from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contactsRoutes.js';
import authRouter from './routes/api/authRoutes.js';

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({ message: err.message, stack: err.stack });
});

export default app;
