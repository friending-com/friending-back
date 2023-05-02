import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { snsURL } from '../types/snsURL';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  instagram: snsURL;

  @Column()
  twitter: snsURL;

  @Column()
  phone: string;

  @Column()
  facebook: snsURL;

  @Column()
  kakaoTalk: snsURL;

  @Column()
  age: number;
}
