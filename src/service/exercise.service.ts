import { User } from '../entity/User';
import { ExerciseLog } from '../entity/Exercise';
import { getRepository } from 'typeorm';

export const exerciseService = {
  createUser: async function (userName: string): Promise<User> {
    const user = new User();
    user.userName = userName;
    return user.save();
  },
  getUsers: async function (): Promise<User[]> {
    return User.find();
  },
  createExercise: async function (
    userId: number,
    description: string,
    duration: number,
    date: string
  ): Promise<ExerciseLog> {
    const logObject = {
      description,
      duration,
      //   user: <any>userId,
      user: { id: userId },
    };
    if (date) {
      logObject['date'] = new Date(date);
    }
    const log = getRepository(ExerciseLog).create(logObject);
    return log.save();
  },
  getExercise: async function (userId, from, to, limit) {
    // return User.find({ where: { id: userId }, relations: ['logs'] });

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`cannot find the user with userId ${userId}`);
    }
    const query = ExerciseLog.createQueryBuilder('log').where(
      'log.user = :id',
      {
        id: userId,
      }
    );
    if (from) {
      query.andWhere('log.date >= :from', { from });
    }
    if (to) {
      query.andWhere('log.date < :to', { to });
    }
    if (limit) {
      query.limit(limit);
    }
    const logs = await query.getMany();
    user.logs = logs;
    return user;
    // return User.createQueryBuilder('user')
    //   .leftJoinAndSelect('user.logs', 'log')
    //   .where('user.id = :id AND log.date >= :from AND log.date < :to', {
    //     from,
    //     to,
    //     id: userId,
    //   })
    //   .take(limit)
    //   .getMany();
  },

  getExerciseCount: async function (userId): Promise<number> {
    return ExerciseLog.count({ where: { user: userId } });
  },
};
