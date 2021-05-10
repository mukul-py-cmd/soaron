// import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
// import { User } from '../entity/User';
// import { ExerciseLog } from '../entity/Exercise';
import { exerciseService } from '../service';
export class ExerciseController {
  // private userRepository = getRepository(User);
  // private ExerciseLogsRepository = getRepository(ExerciseLogs);

  static async getUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    const users = await exerciseService.getUsers();
    return response.json(users);
  }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   return this.userRepository.findOne(request.params.id);
  // }

  static async createUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    try {
      const { userName }: { userName: string } = request.body;
      const user = await exerciseService.createUser(userName);
      return response.status(201).json(user);
    } catch (error) {
      if (error.code === '23505') {
        console.log(JSON.stringify(error));
        return response.status(400).json(error.detail);
      }
      return response.status(500).json(error.message);
    }
  }

  static async createExercise(
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    try {
      const {
        userId,
        description,
        duration,
        date,
      }: {
        userId: number;
        description: string;
        duration: number;
        date: string;
      } = request.body;
      const log = await exerciseService.createExercise(
        userId,
        description,
        duration,
        date
      );
      return response.status(201).json(log);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
  // async remove(request: Request, response: Response, next: NextFunction) {
  //   let userToRemove = await this.userRepository.findOne(request.params.id);
  //   await this.userRepository.remove(userToRemove);
  // }
  static async getExercise(
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    try {
      const { userId, from, to, limit } = request.query;
      // console.log(userId);
      if (!userId) {
        throw new Error('Provide a valid userId');
      }
      const logs = await exerciseService.getExercise(userId, from, to, limit);
      return response.json(logs);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }

  static async getExerciseCount(
    request: Request,
    response: Response,
    next: NextFunction
  ): Response {
    try {
      const { userId }: { userId: number } = request.query;
      console.log(userId);
      if (!userId) {
        throw new Error('Provide a valid userId');
      }
      const count = await exerciseService.getExerciseCount(userId);
      return response.json(count);
    } catch (error) {
      response.status(400).json(error.message);
    }
  }
}
