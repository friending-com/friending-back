import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { snsURL } from '../types/snsURL';
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profiles: Profile[];
}
