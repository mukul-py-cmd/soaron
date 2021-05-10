import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Timestamp } from './Timestamps';
import { User } from './User';
@Entity('exerciseLogs')
export class ExerciseLog extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  duration: number;

  @ManyToOne(() => User, (user) => user.logs, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamptz' })
  date: Date;

  @BeforeInsert()
  updateDate() {
    if (this.date === undefined) this.date = new Date();
  }
}
