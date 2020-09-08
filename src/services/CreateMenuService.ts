import { MenuRepository } from '../repositories/MenuRepository';
import { Menu } from '../models/Menu';
import { uuid } from 'uuidv4';

class CreateMenuService {
  private menuRepository: MenuRepository;
  private forCreateMenu: Menu;

  constructor(menuRepositoryDependency: MenuRepository, newMenu: Menu) {
    this.menuRepository = menuRepositoryDependency;
    this.forCreateMenu = newMenu;
  }

  public async execute(): Promise<Menu> {
    const createdMenu = await this.menuRepository.save({
      id: uuid(),
      name: this.forCreateMenu.name,
      openedAt: new Date(),
      closedAt: new Date(),
    });

    return createdMenu;
  }
}

export default CreateMenuService;
