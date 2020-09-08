import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Menu } from './Menu';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Check('value > 0')
  @Column()
  value!: number;

  @Column()
  description!: string;

  @ManyToMany(type => Menu)
  @JoinTable()
  menu!: Menu[];
}
