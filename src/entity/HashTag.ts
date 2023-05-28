import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;
  @ManyToMany(() => Profile, (profile) => profile.id)
  @JoinTable()
  profiles: Profile[];
}
