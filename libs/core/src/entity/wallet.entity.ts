import {
  Column,
  Entity,
  JoinColumn,
  ObjectId,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Wallet')
export class WalletEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @ObjectIdColumn()
  userId!: ObjectId;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ default: 0 })
  amount!: number;

  @Column()
  currency!: string;
}
