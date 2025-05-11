import { Router } from "express";
import { UserRoutes } from "../users/user.route";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },

]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router;