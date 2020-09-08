import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
