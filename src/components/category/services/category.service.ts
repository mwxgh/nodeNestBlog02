import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { Connection, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CategoryAbleType } from '../entities/categoryAble.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoryService extends BaseService {
  public repository: Repository<any>;
  public entity: any = Category;

  constructor(private dataSource: Connection) {
    super();
    this.repository = this.dataSource.getCustomRepository(CategoryRepository);
  }

  async queryCategory(params: {
    entity: string;
    fields?: string[];
    keyword?: string | '';
    includes?: any;
    sortBy?: string;
    sortType?: 'ASC' | 'DESC';
  }) {
    const include = [];

    if (params.includes) {
      const arr = params.includes.split(',');
      arr.map((i: any) => include.push(i));
    }

    const { entity, fields, keyword, sortBy, sortType } = params;

    let baseQuery = await this.queryBuilder({
      entity,
      fields,
      keyword,
      sortBy,
      sortType,
    });

    if (include.includes('products')) {
      baseQuery = baseQuery.where(`${entity}.categoryType = :type`, {
        type: CategoryAbleType.product,
      });
    }

    if (include.includes('posts')) {
      baseQuery = baseQuery.where(`${entity}.categoryType = :type`, {
        type: CategoryAbleType.post,
      });
    }
    return baseQuery;
  }
}
