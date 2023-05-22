import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { snsURL } from '../types/snsURL';
import { User } from './User';

@Entity()
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  userId: User;

  @OneToOne(() => User, (user) => user.id)
  subId: User;
}
