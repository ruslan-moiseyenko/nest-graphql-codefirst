import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';

@Injectable()
export class CoffeesService {
  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return null;
  }

  async create(createCoffeInput: CreateCoffeeInput) {
    return null;
  }
}
