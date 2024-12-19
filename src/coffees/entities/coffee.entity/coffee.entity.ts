import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'A coffee model', implements: () => Drink })
export class Coffee implements Drink {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'The id of the coffee' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
}
