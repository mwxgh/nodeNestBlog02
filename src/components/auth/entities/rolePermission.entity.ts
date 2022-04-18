import { IdEntity } from '../../base.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'rolePermission' })
export class RolePermission extends IdEntity {
  @Column()
  roleId: number;

  @Column()
  permissionId: number;
}
