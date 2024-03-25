import { Router } from 'express'
import restauranteRouter from './restaurante/restaurante.js'

const mainRouter = Router()
mainRouter.use('/restaurante', restauranteRouter)

export default mainRouter