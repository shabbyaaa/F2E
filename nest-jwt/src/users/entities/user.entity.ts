import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { roleType, userState } from 'src/constants/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '账号' })
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
}

// CREATE TABLE `admin_user` (
//   `user_id` smallint(6) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
//   `account_name` varchar(24) NOT NULL COMMENT '用户账号',
//   `real_name` varchar(20) NOT NULL COMMENT '真实姓名',
//   `passwd` char(32) NOT NULL COMMENT '密码',
//   `passwd_salt` char(6) NOT NULL COMMENT '密码盐',
//   `mobile` varchar(15) NOT NULL DEFAULT '0' COMMENT '手机号码',
//   `role` tinyint(4) NOT NULL DEFAULT '3' COMMENT '用户角色：0-超级管理员|1-管理员|2-开发&测试&运营|3-普通用户（只能查看）',
//   `user_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-失效|1-有效|2-删除',
//   `create_by` smallint(6) NOT NULL COMMENT '创建人ID',
//   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
//   `update_by` smallint(6) NOT NULL DEFAULT '0' COMMENT '修改人ID',
//   `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
//   PRIMARY KEY (`user_id`),
//   KEY `idx_m` (`mobile`)
// ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='后台用户表';
