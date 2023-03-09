import { Request, Response } from 'express';

import User from '../models/user.model';


// create new user
const createUser = (req: Request, res: Response) => {
    const user = new User({...req.body});
}

// update user by id

// get User by id

// get all users

// delete user by id