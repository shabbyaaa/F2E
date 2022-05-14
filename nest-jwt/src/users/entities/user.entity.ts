import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { roleType, userState } from 'src/constants/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '账号', unique: true })
  account: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱', nullable: true })
  email: string;

  @Column({
    default: roleType.User,
    comment: '用户角色：0-管理员|1-普通用户',
  })
  role: number;

  @Column({
    default: userState.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  user_status: number;

  @Column({ type: 'date', comment: '创建时间', nullable: true })
  create_time: Date;

  @Column({ type: 'date', comment: '修改时间', nullable: true })
  update_time: Date;

  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 10);
  // }
}
