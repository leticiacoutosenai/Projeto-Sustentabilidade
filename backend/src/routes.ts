import { Router } from 'express'
const router = Router();

import { isAuthenticated } from './middlewares/isAuthenticated'

import { CreateClienteController } from './controllers/cliente/CreateClienteController'
import { AuthClienteController } from './controllers/cliente/AuthClienteController'

router.post('/cliente/create', new CreateClienteController().handle)
router.post('/cliente/auth', new AuthClienteController().handle)


export { router };
