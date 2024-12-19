import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { CoffeeType } from 'src/common/enums/coffee-type.enum';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';
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

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: CoffeeType;
}
