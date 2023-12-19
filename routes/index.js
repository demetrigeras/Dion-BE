import {Router} from 'express'
import usersRoutes from './user.js'



const router = Router();



router.use('/', usersRoutes)

export default router;
