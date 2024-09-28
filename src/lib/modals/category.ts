import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;

export { CategorySchema };
