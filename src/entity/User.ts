import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Profile } from './Profile';
import { Category } from './Category';

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
}
