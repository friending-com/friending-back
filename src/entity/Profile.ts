import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { snsURL } from '../types/snsURL';
import { HashTag } from './HashTag';
import { User } from './User';
import { Category } from './Category';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column({ nullable: true })
  info: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  instagram: snsURL;

  @Column({ nullable: true })
  thread: snsURL;

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

  @Column({ nullable: true })
  whatsapp: snsURL;

  @Column({ nullable: true })
  snapchat: snsURL;

  @Column({ nullable: true })
  kakaoStory: snsURL;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @ManyToMany(() => HashTag, (hashTag) => hashTag.id, { onDelete: 'CASCADE' })
  @JoinTable()
  hashTags: HashTag[];

  @ManyToOne(() => HashTag, (hashtag) => hashtag.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  workSpace: HashTag;

  @ManyToMany(() => Profile, (profile) => profile.friends, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  friends: Profile[];

  @ManyToMany(() => Category, (category) => category.friends)
  category: Category[];
}
