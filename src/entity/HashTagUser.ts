import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HashTagUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTagId: number;
  @Column()
  userId: number;
}
