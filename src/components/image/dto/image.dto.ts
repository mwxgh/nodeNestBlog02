import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ImageProperties {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;
}

export class CreateImageDto extends OmitType(ImageProperties, [] as const) {}

export class UpdateImageDto extends PartialType(ImageProperties) {}
