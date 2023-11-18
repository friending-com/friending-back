import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Profile } from './Profile';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Profile, (profile) => profile.group)
  profiles: Profile[];
}
