import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router
    .get(
        '/',
        auth(USER_ROLE.admin),
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
    .patch(
        '/:email',
        auth(USER_ROLE.user),
        validateRequest(UserValidation.updateUserValidationSchema),
        UserController.updateSingleUser
    )
    .delete(
        '/:email',
        auth(USER_ROLE.admin, USER_ROLE.user),
        UserController.deleteSingleUser
    )


export const UserRoutes = router;