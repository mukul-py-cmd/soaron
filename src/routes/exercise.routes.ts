import { Router } from 'express';
import { ExerciseController } from '../controller';
// const exerciseController = new ExerciseController();
const exerciseRouter = Router();

exerciseRouter.route('/new-user').post(ExerciseController.createUser);
exerciseRouter.route('/users').get(ExerciseController.getUsers);
exerciseRouter.route('/add').post(ExerciseController.createExercise);
exerciseRouter.route('/log').get(ExerciseController.getExercise);
exerciseRouter.route('/logcount').get(ExerciseController.getExerciseCount);
export default exerciseRouter;
