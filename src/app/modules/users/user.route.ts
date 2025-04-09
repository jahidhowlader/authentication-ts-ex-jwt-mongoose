import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router
    .get(
        '/',
        auth(),
        UserController.getAllUser
    )
    .post(
        '/login',
        validateRequest(UserValidation.loginValidationSchema),
        UserController.logInUser
    )
    .post(
        '/create-user',
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createUser
    )
    .post(
        '/create-admin',
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createAdmin
    )
    .post(
        '/create-merchant',
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createMerchant
    )


export const UserRoutes = router;