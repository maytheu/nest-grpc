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

  @Column()
  userId!: ObjectId;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ default: 0 })
  amount!: number;
}
