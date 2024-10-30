import { Application } from 'express';
import v1Router from './v1';

export default (app: Application) => {
  app.use('/v1', v1Router);
};
