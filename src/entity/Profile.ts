import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { snsURL } from '../types/snsURL';
import { HashTag } from './HashTag';
import { User } from './User';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  instagram: snsURL;

  @Column({ nullable: true })
  twitter: snsURL;

  @Column({ nullable: true })
  facebook: snsURL;

  @Column({ nullable: true })
  kakaoTalk: snsURL;

  @Column({ nullable: true })
  discord: snsURL;

  @Column({ nullable: true })
  line: snsURL;

  @Column({ nullable: true })
  naverBlog: snsURL;

  @Column({ nullable: true })
  naverBand: snsURL;

  @Column({ nullable: true })
  telegram: snsURL;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: false })
  isMain: boolean;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @ManyToMany(() => HashTag, (hashTag) => hashTag.id)
  @JoinTable()
  hashTags: HashTag[];
}
