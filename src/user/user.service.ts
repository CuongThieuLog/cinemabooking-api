import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: any) {
    return await this.prismaService.user.create(createUserDto);
  }
  async findAll(page: number, perPage: number, queryParams: any) {
    const where: any = {};

    this.appendFilter(queryParams, where);

    const totalCount = await this.prismaService.user.count({ where });

    const users = await this.prismaService.user.findMany({
      where,
      skip: Number((page - 1) * perPage),
      take: Number(perPage),
    });

    const totalPages = Math.ceil(totalCount / perPage);
    const usersWithFullName = users.map((user) => ({
      ...user,
      full_name: `${user.first_name} ${user.last_name}`,
    }));

    return await this.paginateData(
      page,
      usersWithFullName,
      totalPages,
      perPage,
      totalCount,
    );
  }

  appendFilter(queryParams: any, where: any) {
    if (queryParams.role) {
      where.role = { equals: queryParams.role };
    }

    if (queryParams.search) {
      where.OR = [
        { first_name: { contains: queryParams.search } },
        { last_name: { contains: queryParams.search } },
      ];
    }

    return where;
  }

  paginateData(
    page: number,
    data: object,
    totalPage: number,
    perPage: number,
    totalCount: number,
  ) {
    const totalPages = Math.ceil(totalCount / perPage);
    const to = Math.min(page * perPage, totalCount);

    return {
      current_page: page,
      data: data,
      from: (page - 1) * perPage + 1,
      last_page: totalPages,
      per_page: Number(perPage),
      to: to,
      totalPage: totalPage,
      total: totalCount,
    };
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    return { data: user };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
