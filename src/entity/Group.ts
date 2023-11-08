import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, (user) => user.group)
  user: User[];
}
