import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Activity } from './Activity';

@Entity()
export class User {
  @PrimaryColumn({ length: 80 })
  deviceId: string;

  @ManyToMany(() => Activity)
  @JoinTable()
  activities: Activity[];
}
