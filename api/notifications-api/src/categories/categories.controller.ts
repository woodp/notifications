import { Controller, Get, Logger } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { handleError } from 'src/errors/handle-error';
import { Mappers } from 'src/notifications/mappers';
import { ApiResponse } from '@nestjs/swagger';
import { CategoryDto } from './dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  private readonly logger = new Logger(CategoriesController.name);
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({ type: CategoryDto, isArray: true })
  @Get()
  async get() {
    try {
      const res = await this.categoriesService.get();
      return res.map(Mappers.toCategoryDto);
    } catch (e) {
      handleError(e, this.logger);
    }
  }
}
