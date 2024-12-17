import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(private coffeesRepository: Repository<Coffee>) {}
  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: `${id}` },
    });

    if (!coffee) {
      throw new UserInputError('Coffee with this id not found');
    }

    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput) {
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }
}
