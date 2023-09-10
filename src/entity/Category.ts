import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User';
import { Profile } from './Profile';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @ManyToMany(() => Profile, (profile) => profile.category)
  @JoinTable()
  friends: Profile[];
}
