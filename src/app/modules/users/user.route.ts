import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';

const router = express.Router();

router
    .get(
        '/login',
        UserController.logInUser
    )
    .post(
        '/create-user',
        validateRequest(UserValidation.userValidationSchema),
        UserController.createUser
    )
    .post(
        '/create-admin',
        validateRequest(UserValidation.userValidationSchema),
        UserController.createAdmin
    )
    .post(
        '/create-merchant',
        validateRequest(UserValidation.userValidationSchema),
        UserController.createMerchant
    )


export const UserRoutes = router;