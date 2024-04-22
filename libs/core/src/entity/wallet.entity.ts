import {
  Column,
  Entity,
  JoinColumn,
  ObjectId,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { User } from '@app/core';

@Entity('Wallet')
export class WalletEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  amount!: number;
}
