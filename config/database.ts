import { User } from '../src/components/user/entities/user.entity';
import { Role } from '../src/components/auth/entities/role.entity';
import { Permission } from '../src/components/auth/entities/permission.entity';
import { PasswordReset } from '../src/components/auth/entities/passwordReset.entity';
import { RolePermission } from '../src/components/auth/entities/rolePermission.entity';
import { UserRole } from '../src/components/auth/entities/userRole.entity';
import { Product } from '../src/components/product/entities/product.entity';
import { Cart } from '../src/components/cart/entities/cart.entity';
import { CartItem } from '../src/components/cart/entities/cartItem.entity';
import { Category } from '../src/components/category/entities/category.entity';
import { CategoryAble } from '../src/components/category/entities/categoryAble.entity';
import { Order } from '../src/components/order/entities/order.entity';
import { OrderProduct } from '../src/components/order/entities/orderProduct.entity';
import { TagName } from '../src/components/tag/entities/tag.entity';
import { TagAble } from '../src/components/tag/entities/tagAble.entity';
import { Comment } from '../src/components/comment/entities/comment.entity';
import { Image } from '../src/components/image/entities/image.entity';
import { Contact } from '../src/components/contact/entities/contact.entity';
import { PostAble } from '../src/components/post/entities/post.entity';
import { ImageAble } from '../src/components/image/entities/imageAble.entity';

export default (): any => ({
  type: process.env.DB_CONNECTION || 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  entities: [
    User,
    Role,
    Permission,
    PasswordReset,
    RolePermission,
    UserRole,
    Product,
    Cart,
    CartItem,
    Category,
    CategoryAble,
    Order,
    OrderProduct,
    TagAble,
    Comment,
    Image,
    ImageAble,
    PostAble,
    TagName,
    Contact,
  ],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: process.env.DB_LOGGING === 'true',
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'database/migrations',
  },
});
