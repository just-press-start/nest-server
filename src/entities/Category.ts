import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Activity } from './Activity';
import { Topic } from './Topic';

@Entity()
export class Category {
  @PrimaryColumn({ length: 40 })
  name: string;

  @OneToMany(() => Activity, (activity) => activity.category)
  activity: Activity;

  @ManyToOne(() => Topic, (topic) => topic)
  topic: Topic;

  @Column({ length: 40 })
  img: string;
}
