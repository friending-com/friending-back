import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;
  @ManyToMany(() => User, (user) => user.id)
  users: User[];
}
