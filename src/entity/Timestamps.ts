import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export class Timestamp extends BaseEntity {
  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;
}
