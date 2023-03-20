import { Request, Response } from 'express';

import Category, { ICategory } from '../models/category.model';
import body from '../lib/body';

const createCategory = async (req: Request, res: Response) => {
    try{
        // Validate and handle validate error
        const validate = body.validate<ICategory>(req.body);
        if(!validate.ok) throw {type: 'form', info: validate.errors};

        // After validation passed create new category document with validate generated object & save to database
        const category: ICategory = new Category(validate.prepared);
        await category.save();


        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'form') return res.status(400).json({ok: false, errors: error.info});
        res.status(500).json({ok: false});
        console.log(error);
    }
}

const updateCategory = async (req: Request, res: Response) => {
    try{
        // Find category if category exist
        var category: ICategory | null = await Category.findById(req.params.id);
        if(!category) throw {type: 'notfound'};

        // Validate and handle validate error
        const validate = body.validate<ICategory>(req.body);
        if(!validate.ok) throw {type: 'form', info: validate.errors};

        // After validation passed update existing category with validate generated object & save to database
        if(validate.prepared){
            category = Object.assign(category, validate.prepared);
            category.save();
        }

        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'category not found'});
        if(error.type === 'form') return res.status(400).json({ok: false, errors: error.info});
        res.status(500).json({ok: false});
    }
}

const findCategory = async (req: Request, res: Response) => {
    try{
        // Find category and proceed if found else throw error
        const category = await Category.findById(req.params.id);
        if(!category) throw {type: 'notfound'};

        return res.status(201).json({ok: true, category});
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'category not found'});
        res.status(500).json({ok: false});
    }
}

const findCategories = async (req: Request, res: Response) => {
    try{
        // Find categories and proceed if found else throw error
        const categories = await Category.find({});
        if(categories.length < 1) throw {type: 'notfound'};

        return res.status(201).json({ok: true, categories});
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'no categories found'});
        res.status(500).json({ok: false});
    }
}

const deleteCategory = async (req: Request, res: Response) => {
    try{
        // Find category and delete if found else throw error
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category) throw {type: 'notfound'};

        return res.status(201).json({ok: true });
    }catch(error: any){
        if(error.type === 'notfound') return res.status(404).json({ok: false, errors: 'category not found'});
        res.status(500).json({ok: false});
    }
}

export default {createCategory, updateCategory, findCategory, findCategories, deleteCategory};