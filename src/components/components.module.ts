import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { OptionModule } from './option/option.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    CategoryModule,
    CommentModule,
    ContactModule,
    ImageModule,
    OptionModule,
    OrderModule,
    PostModule,
    ProductModule,
    TagModule,
    UserModule,
  ],
})
export class ComponentsModule {}