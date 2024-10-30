import { Router } from 'express';
import authRoutes from './auth';

const v1Router = Router();

v1Router.use('/auth', authRoutes);

export default v1Router;
