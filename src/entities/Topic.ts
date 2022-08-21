import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @OneToMany(() => Category, (category) => category.topic)
  category: Category;

  @Column({ length: 40 })
  img: string;
}
