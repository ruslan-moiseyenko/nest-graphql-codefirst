import { Module } from '@nestjs/common';
import { CoffeesResolver } from './coffees.resolver';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { CoffeeFlavorsResolver } from './coffee-flavors.resolver';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor]), PubSubModule],
  providers: [CoffeesResolver, CoffeesService, CoffeeFlavorsResolver],
})
export class CoffeesModule {}
