import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Notifiable } from '../../../shared/services/notification/decorators/notifiable.decorator';
import { CategoryAble } from './categoryAble.entity';

@Notifiable()
@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  categoryType: string;

  @Column({ name: 'parentId', type: 'int' })
  public parentId: number;

  @Column({ type: 'int', default: 1 })
  status: number;

  @Column({ type: 'timestamp' })
  public verifiedAt: Date;

  @OneToMany(() => Category, (cate) => cate.children)
  @JoinColumn({
    name: 'parentId',
    referencedColumnName: 'id',
  })
  children: Category[];

  @OneToMany(() => CategoryAble, (categoryAble) => categoryAble.category)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  products: CategoryAble[];

  @OneToMany(() => CategoryAble, (categoryAble) => categoryAble.post)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  posts: CategoryAble[];
}