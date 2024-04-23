import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Transaction')
export class TransactionEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column()
  userId!: ObjectId;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ enum: ['buy', 'sell', 'credit', 'debit'] })
  type!: string;

  @Column()
  currency!: string;

  @Column()
  amount!: number;
}
