import { Schema, models, model } from "mongoose";
import { UserSchema } from "./user";

const ExpenseUserSchema = new Schema({
  user: { type: UserSchema, required: true }, // Embed the UserSchema
  user_id: { type: Number, required: true },
  paid_share: { type: Number, required: true },
  owed_share: { type: Number, required: true },
  net_balance: { type: Number, required: true },
});

const ExpenseUser =
  models.ExpenseUser || model("ExpenseUser", ExpenseUserSchema);

export default ExpenseUser;

export { ExpenseUserSchema }
