import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { userState } from 'src/constants/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(user);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { pageNo = 1, pageSize = 10 } = paginationQuery;

    /**
     * select * from xxx limit 10 offset 0;
     * offset 偏移量 0表示从第一条开始
     * limit 共取几条 10表示本次查询10条
     * pageNo, pageSize, itemCount
     */
    const total = await this.userRepository
      .query(
        `select count(1) as total from "public"."user" WHERE "user_status" != '${userState.Deleted}'`,
      )
      .then((data) => {
        return data[0]?.total;
      });
    console.log('total :>> ', total);

    return this.userRepository.query(
      `SELECT * FROM "public"."user" WHERE "user_status" != '${
        userState.Deleted
      }' order by id limit ${pageSize} OFFSET ${(pageNo - 1) * pageSize}`,
    );
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    user.user_status = userState.Deleted;
    return this.userRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    console.log('LoginUserDto: ', loginUserDto);
    const { account, password } = loginUserDto;

    // SELECT * FROM "public"."user" WHERE "account" = 'admin1' LIMIT 1000 OFFSET 0
    const user = await this.userRepository
      .query(`select * from "public"."user" where "account" = '${account}'`)
      .then((data) => data[0]);

    console.log('user :>> ', user);

    if (!user) {
      return {
        msg: '该用户不存在！',
      };
    }

    console.log('user.password :>> ', user.password);
    console.log('password :>> ', password);
    if (user.password !== password) {
      return {
        msg: '用户密码错误！',
      };
    }

    const token = await this.jwtService.sign({
      account: user.account,
      sub: user.id,
      role: user.role,
    });
    console.log('token :>> ', token);
    return token;

    console.log('token :>> ', token);
  }
}
