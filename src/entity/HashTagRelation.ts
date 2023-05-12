import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HashTagRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTagId: number;
  @Column()
  userId: number;
}
