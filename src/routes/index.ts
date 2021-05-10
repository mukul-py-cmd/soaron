import { Router } from 'express';
import exerciseRouter from './exercise.routes';

const routes = Router();

routes.use('/exercise', exerciseRouter);

export default routes;
