import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { DrinksResultUnion } from 'src/common/union/drinks-result.union';
import { Tea } from 'src/teas/entities/tea.entity/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [DrinksResultUnion], { name: 'drinks' })
  async getAllDrinks(): Promise<(typeof DrinksResultUnion)[]> {
    // mock data
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombian';
    coffee.brand = 'Black Crow Coffee';

    const tea = new Tea();
    tea.name = 'Earl Grey';

    return [coffee, tea];
  }
}
