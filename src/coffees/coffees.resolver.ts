import { CoffeesService } from './coffees.service';
import { Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffe.enity/coffee.entity';
import { Args, ID, Mutation, Query } from '@nestjs/graphql';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query(() => [Coffee], { name: 'coffees' })
  async findAll() {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Mutation(() => Coffee, { name: 'createCoffee', nullable: true })
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ) {
    return this.coffeesService.create(createCoffeeInput);
  }
}
