import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ enum: ['buy', 'sell', 'credit', 'debit'] })
  type!: string;

  @Column()
  currencyFrom!: string;

  @Column()
  currencyTo!: string;


  @Column()
  amount!: number;
}
