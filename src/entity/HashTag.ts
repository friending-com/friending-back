import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  users: User[];
}
