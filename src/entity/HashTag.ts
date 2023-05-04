import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Relation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashTag: string;

  @Column()
  useId: number[];
}
