import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { NotFoundError } from '../errors/not-found.error';
import { Message } from './entities/message.entity';
import { v4 as uuid } from 'uuid';
import * as sanitizer from 'sanitizer';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(categoryId: string, text: string) {
    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category)
      throw new NotFoundError(
        `Could not find a category with id ${categoryId}`,
      );

    const message = {
      id: uuid(),
      category,
      text: sanitizer.escape(text),
      sent: false,
    } as Message;
    return await this.messagesRepository.save(message);
  }
}
