import { Schema, Types, model } from "mongoose";

interface iItem {
    title: string;
    description: string;
    image?: string;
    link: string;
    dashId: Types.ObjectId;
}

const itemSchema = new Schema<iItem>({
    title: String,
    description: String,
    image: String,
    link: String,
    dashId: Types.ObjectId
})

const Item = model<iItem>('Item', itemSchema);

export default Item;