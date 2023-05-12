import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { snsURL } from '../types/snsURL';

@Entity()
export class UserRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  subId: number;
}
