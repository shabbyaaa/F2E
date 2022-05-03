import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'coffee' 小写
export class Coffee {
  // 自增主键
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  // 将数组储存为json 可选的 可以为空
  @Column('json', { nullable: true })
  flavors: string[];
}
