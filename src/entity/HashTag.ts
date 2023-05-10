import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HashTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;

  @Column()
  userId: number[];
}
