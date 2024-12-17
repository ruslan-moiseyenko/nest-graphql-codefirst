import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';
import { UpdateCoffeeInput } from 'src/coffees/dto/update-coffee.input/update-coffee.input';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeesRepository: Repository<Coffee>,
  ) {}
  async findAll() {
    return this.coffeesRepository.find();
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id },
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

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} not found`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
