import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @ManyToOne(() => Category, (category) => category)
  category: Category;

  @Column({ length: 40 })
  img: string;
}
