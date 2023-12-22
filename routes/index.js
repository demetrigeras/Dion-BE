import {Router} from 'express'
import usersRoutes from './user.js'
import EventRoutes from './event.js'
import ProfileRoutes from './profile.js'
import attendaceRoutes from './attendance.js'



const router = Router();

router.get("/", (req, res) => res.send("This is the charity api root!"));

router.use('/', usersRoutes)
router.use("/event", EventRoutes);
router.use("/profile", ProfileRoutes)
router.use('/attend', attendaceRoutes)

export default router;
