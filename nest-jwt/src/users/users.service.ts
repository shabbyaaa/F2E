import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { userState } from 'src/constants/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });

    return this.userRepository.save(user);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { pageNo, pageSize } = paginationQuery;

    /**
     * select * from xxx limit 10 offset 0;
     * offset 偏移量 0表示从第一条开始
     * limit 共取几条 10表示本次查询10条
     * pageNo, pageSize, itemCount
     */
    return this.userRepository.query(
      `SELECT * FROM "public"."user" WHERE "user_status" != '${
        userState.Deleted
      }' order by id limit ${pageSize} OFFSET ${(pageNo - 1) * pageSize}`,
    );
    // return this.userRepository.find({
    //   skip: offset,
    //   take: limit,
    // });
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
}
