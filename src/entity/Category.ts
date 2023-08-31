import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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

  @ManyToMany(() => Profile, (profile) => profile.friends)
  @JoinTable()
  friends: Profile[];
}
