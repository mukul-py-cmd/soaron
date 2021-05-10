import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ExerciseLog } from './Exercise';
import { Timestamp } from './Timestamps';
@Entity('users')
export class User extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  userName: string;

  @OneToMany(() => ExerciseLog, (logs) => logs.user)
  logs: ExerciseLog[];
}
