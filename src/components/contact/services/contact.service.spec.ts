import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponseService } from 'src/shared/services/api-response/api-response.service';
import { Repository } from 'typeorm';
import { ContactController } from '../controllers/amin.contact.controller';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        ContactService,
        ApiResponseService,
        {
          provide: 'ContactRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ContactService>(ContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});