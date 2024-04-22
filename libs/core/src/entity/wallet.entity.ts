import {
  Column,
  Entity,
  JoinColumn,
  ObjectId,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { User } from '@app/core';

@Entity()
export class Wallet {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  currency!: string;

  @Column()
  amount!: number;
}
