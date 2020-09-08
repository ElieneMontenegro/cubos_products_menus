import { Router } from 'express';

import menuRouter from './menu.routes';
import productRouter from './product.routes';
import menuProductRouter from './menuProduct.routes';

const routes = Router();

routes.use('/menus', menuRouter);
routes.use('/products', productRouter);
routes.use('/menus-products', menuProductRouter);

export default routes;
