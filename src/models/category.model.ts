import mongoose, { Document } from "mongoose";

export interface ICategory extends Document{
    name: string,
    order: number,
    access: {groups: string[], users: string[]},
    forums: string[]
};

const categorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
    access: {
        groups: [{ type: Array(mongoose.Schema.Types.ObjectId), ref: 'Group' }],
        users: [{ type: Array(mongoose.Schema.Types.ObjectId), ref: 'User' }]
    },
    forums: [{ type: Array(mongoose.Schema.Types.ObjectId), ref: 'Forum' }]
}, { timestamps: true });

// Fixing order in case there is gaps ex: 1,2,3,5 . in case of negative numbers reordering from 0 .
categorySchema.pre('save', async function(next){
    if(!this.isNew){
        return;
    }
    const categories = await Category.find({}).sort({ order: 'asc' });
    if(this.order <= 0){
        this.order = 0;
        let i = 1;
        categories.forEach(category => {
            console.log(this.id + ' - ' + i);
            category.order = i;
            category.save();
            i++;
        });
    }else{
        let i = this.order + 1;
        categories.forEach(category => {
            if(category.order >= this.order){
                console.log(this.id + ' - ' + i);
                category.order = i;
                category.save();
                i++;
            }
        });
    }
    next();
});

const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;