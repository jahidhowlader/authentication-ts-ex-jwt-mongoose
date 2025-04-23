import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router
    // ALL USER
    .get(
        '/',
        auth(USER_ROLE.admin),
        UserController.getAllUser
    )
    // USER LOGIN
    .post(
        '/login',
        validateRequest(UserValidation.loginValidationSchema),
        UserController.logInUser
    )
    // CREATE DEFAULT USER
    .post(
        '/create-user',
        // upload.none(),
        upload.single('profileImage'),
        (request: Request, response: Response, next: NextFunction) => {
            request.body = JSON.parse(request.body.data);
            next();
        },
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createUser
    )
    // CREATE ADMIN
    .post(
        '/create-admin',
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createAdmin
    )
    // CREATE MERCHANT
    .post(
        '/create-merchant',
        validateRequest(UserValidation.createUserValidationSchema),
        UserController.createMerchant
    )
    // USER STATUS BLOCK BY ADMIN
    .post(
        '/change-status/:email',
        auth(USER_ROLE.admin),
        validateRequest(UserValidation.changeStatusValidationSchema),
        UserController.changeUserStatus,
    )
    // RESET USER PASSWORD


    // UPDATE OWN USER DATA
    .patch(
        '/:email',
        auth(USER_ROLE.user),
        validateRequest(UserValidation.updateUserValidationSchema),
        UserController.updateSingleUser
    )
    // DELETE OWN PROFILE
    .delete(
        '/:email',
        auth(USER_ROLE.admin, USER_ROLE.user),
        UserController.deleteSingleUser
    )


export const UserRoutes = router;