import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';
import { UpdateCoffeeInput } from 'src/coffees/dto/update-coffee.input/update-coffee.input';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private flavorsRepository: Repository<Flavor>,
    private readonly pubSub: PubSub,
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
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((flavor) =>
        this.preloadFlavorByName(flavor),
      ),
    );

    const coffee = this.coffeesRepository.create({
      ...createCoffeeInput,
      flavors,
    });

    const newCoffeeEntity = this.coffeesRepository.save(coffee);

    // publish the event for subscribers
    this.pubSub.publish('coffeeAdded', { coffeeAdded: newCoffeeEntity });

    return newCoffeeEntity;
  }

  async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
    const flavors =
      updateCoffeeInput.flavors &&
      (await Promise.all(
        updateCoffeeInput.flavors.map((flavor) =>
          this.preloadFlavorByName(flavor),
        ),
      ));

    const coffee = await this.coffeesRepository.preload({
      id,
      ...updateCoffeeInput,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorsRepository.create({ name });
  }
}
