import express, { Router } from 'express';
import { adminRegister, adminLogin } from '../controller/adminAuthController';

const router: Router = express.Router();

// login route
router.post('/login', adminLogin);

// signup route
router.post('/signup', adminRegister);

export default router;