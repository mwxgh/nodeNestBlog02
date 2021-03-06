import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostAble } from '../../post/entities/post.entity';
import { PostTransformer } from '../../post/transformers/post.transformer';
import { Product } from '../../product/entities/product.entity';
import { ProductTransformer } from '../../product/transformers/product.transformer';
import { ApiResponseService } from '../../../shared/services/apiResponse/apiResponse.service';
import { getRepository } from 'typeorm';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dto/comment.dto';
import { CommentAbleType } from '../entities/comment.entity';
import { CommentTransformer } from '../transformers/comment.transformer';

@ApiTags('Comments')
@ApiHeader({
  name: 'Content-Type',
  description: 'application/json',
})
@Controller('api/comment')
export class UserCommentController {
  constructor(
    private comment: CommentService,
    private response: ApiResponseService,
  ) {}

  @Get()
  @ApiQuery({ name: 'id' })
  @ApiQuery({ name: 'type' })
  async show(@Query() query: any): Promise<any> {
    if (!query.type.include('posts' || 'products')) {
      throw new NotFoundException();
    }

    if (query.type == 'posts') {
      const post = await getRepository(PostAble)
        .createQueryBuilder(query.type)
        .leftJoinAndSelect(`${query.type}.comments`, 'comments')
        .where(`${query.type}.id = :id`, { id: Number(query.id) })
        .getOne();
      if (!post) throw new NotFoundException();
      return this.response.item(post, new PostTransformer());
    }

    if (query.type == 'products') {
      const product = await getRepository(Product)
        .createQueryBuilder(query.type)
        .leftJoinAndSelect(`${query.type}.comments`, 'comments')
        .where(`${query.type}.id = :id`, { id: Number(query.id) })
        .getOne();
      if (!product) throw new NotFoundException();
      return this.response.item(product, new ProductTransformer(['comments']));
    }
  }

  @Post()
  async store(@Body() body: CreateCommentDto): Promise<any> {
    const value = Object.values(CommentAbleType);

    const arr = [];

    value.forEach((el) => arr.push(el));
    if (!arr.includes(body.commentAbleType)) throw new NotFoundException();

    const data = await this.comment.create(body);

    return this.response.item(data, new CommentTransformer());
  }
}
