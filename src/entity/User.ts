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

  @Column()
  instagram: snsURL;

  @Column()
  twitter: snsURL;

  @Column()
  facebook: snsURL;

  @Column()
  kakaoTalk: snsURL;
  @Column()
  discord: snsURL;
  @Column()
  line: snsURL;
  @Column()
  naverBlog: snsURL;
  @Column()
  naverBand: snsURL;
  @Column()
  telegram: snsURL;
}
