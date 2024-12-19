import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Drink } from 'src/common/interfaces/drink.interface/drink.interface';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: 'drinks' })
  async getAllDrinks(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombian';
    coffee.brand = 'Black Crow Coffee';

    const tea = new Tea();
    tea.name = 'Earl Grey';

    return [coffee, tea];
  }
}
