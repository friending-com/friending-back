import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  instagram: string;

  @Column()
  twitter: string;

  @Column()
  phone: string;

  @Column()
  facebook: string;

  @Column()
  kakaoTalk: string;

  @Column()
  age: number;
}
