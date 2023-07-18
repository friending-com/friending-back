import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
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

  @OneToOne(() => Profile, (profile) => profile.workspace)
  profile: Profile;
}
