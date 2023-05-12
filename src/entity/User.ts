import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { snsURL } from '../types/snsURL';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
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
}
