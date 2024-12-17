import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'A coffee model' })
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'The id of the coffee' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ type: 'json' })
  flavors: string[];
}
