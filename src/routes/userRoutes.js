
import express from 'express'

const router = express.Router()

import authenticateToken from '../middlewares/authenticateToken.js'
import { getAll, getById, getMe, update, remove} from "../controllers/userController.js"
router.use(authenticateToken)

router.get('/', getAll)
router.get('/me', getMe)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', remove)

export default router