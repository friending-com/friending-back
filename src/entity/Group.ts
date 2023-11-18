import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Profile } from './Profile';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Profile, (profile) => profile.group)
  profiles: Profile[];
}
