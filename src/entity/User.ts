import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Profile } from './Profile';
import { Category } from './Category';
import { Group } from './Group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Profile, (profile) => profile.user, { onDelete: 'CASCADE' })
  profiles: Profile[];

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @Column({ nullable: true })
  fcmToken: string;

  @ManyToOne(() => Group, (group) => group.user)
  group: Group;
}
