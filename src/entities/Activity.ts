import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @ManyToOne(() => Category, (category) => category)
  category: Category;

  @ManyToMany(() => User, (user) => user.activities)
  users: User[];

  @Column({ length: 40 })
  img: string;
}
