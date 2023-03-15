import { Request, Response } from 'express';

import User from '../models/user.model';
import body from '../lib/body';
import { IUser } from '../models/user.model';

const createUser = async (req: Request, res: Response) => {
    try{
        // Validate and handle validate error
        const validate = body.validate<IUser>(req.body);
        if(!validate.ok) throw {type: 'form', info: validate.errors};

        // After validation passed create new user document with validate generated object & save to database
        const user: IUser = new User(validate.prepared);
        await user.save();


        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'form') return res.status(400).json({ok: false, errors: error.info});
        res.status(500).json({ok: false});
    }
}

const updateUser = async (req: Request, res: Response) => {
    try{
        // Find user if user exist
        var user: IUser | null = await User.findById(req.params.id);
        if(!user) throw {type: 'notfound'};

        // Validate and handle validate error
        const validate = body.validate<IUser>(req.body);
        if(!validate.ok) throw {type: 'form', info: validate.errors};

        // After validation passed update existing user with validate generated object & save to database
        if(validate.prepared){
            user = Object.assign(user, validate.prepared);
            user.save();
        }

        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'user not found'});
        if(error.type === 'form') return res.status(400).json({ok: false, errors: error.info});
        res.status(500).json({ok: false});
    }
}

const findUser = async (req: Request, res: Response) => {
    try{
        // Find user and proceed if found else throw error
        const user = await User.findById(req.params.id);
        if(!user) throw {type: 'notfound'};

        return res.status(201).json({ok: true, user});
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'user not found'});
        res.status(500).json({ok: false});
    }
}

const findUsers = async (req: Request, res: Response) => {
    try{
        // Find users and proceed if found else throw error
        const users = await User.find({});
        if(users.length < 1) throw {type: 'notfound'};

        return res.status(201).json({ok: true, users});
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'no users found'});
        res.status(500).json({ok: false});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try{
        // Find user and delete if found else throw error
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) throw {type: 'notfound'};

        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'user not found'});
        res.status(500).json({ok: false});
    }
}

export default {createUser, updateUser, findUser, findUsers, deleteUser};