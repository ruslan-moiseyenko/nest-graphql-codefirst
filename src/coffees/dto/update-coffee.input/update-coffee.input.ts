import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from 'src/coffees/dto/create-coffee.input/create-coffee.input';

@InputType()
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {}
