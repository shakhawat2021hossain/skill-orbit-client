import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route.js";

export const router = Router()
const apiRoutes = [

    {
        path: '/auth',
        routes: authRoutes
    },
    
]

apiRoutes.forEach(route => router.use(route.path, route.routes)
)