import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class Category {
  @PrimaryColumn({ length: 40 })
  name: string;

  @OneToMany(() => Activity, (activity) => activity.category)
  activity: Activity;

  @Column({ length: 40 })
  img: string;
}
