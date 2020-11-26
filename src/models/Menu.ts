import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../models/Product';

//criar tabela

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  openedAt!: Date;

  @Column()
  closedAt!: Date;

  @ManyToMany(type => Product, product => product.menus)
  products!: Product[];
}
