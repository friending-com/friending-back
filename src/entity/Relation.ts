import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { snsURL } from '../types/snsURL';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  subId: number;
}
