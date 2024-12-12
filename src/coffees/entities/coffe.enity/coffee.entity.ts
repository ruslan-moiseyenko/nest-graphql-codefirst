import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A coffee model' })
export class Coffee {
  @Field(() => ID, { description: 'The id of the coffee' })
  id: string;
  name: string;
  brand: string;
  flavors: string[];
}
