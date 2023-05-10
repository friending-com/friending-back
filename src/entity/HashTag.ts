import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserIDList } from '../types/ArrayString';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;

  @Column()
  userId: UserIDList;
}
