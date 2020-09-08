import { Router } from 'express';

const menuProductRouter = Router();

//recebe id do menu e id do produto, adiciona na tabela menuproductmenus um produto a um menu
menuProductRouter.post('/', async (request, response) => {
  try {
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//recebe id do produto e do menu, apaga 
menuProductRouter.delete('/', (request, response) => {
  try {
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default menuProductRouter;
