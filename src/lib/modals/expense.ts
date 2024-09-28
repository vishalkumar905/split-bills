import { Schema, model, models } from "mongoose";
import { CategorySchema } from "./category";
import { ExpenseUserSchema } from "./expense-user";
import { RepaymentSchema } from "./repayment";
import { UserSchema } from "./user";


const ExpenseSchema = new Schema({
  
  group_id: { type: Number, required: true },
  expense_bundle_id: { type: Number },
  description: { type: String, required: true },
  repeats: { type: Boolean, default: false },
  repeat_interval: { type: String },
  email_reminder: { type: Boolean, default: false },
  email_reminder_in_advance: { type: Number, default: -1 },
  next_repeat: { type: Date },
  details: { type: String, default: "" },
  comments_count: { type: Number, default: 0 },
  payment: { type: Boolean, default: false },
  creation_method: { type: String, required: true },
  transaction_method: { type: String, required: true },
  transaction_confirmed: { type: Boolean, default: false },
  transaction_id: { type: String },
  transaction_status: { type: String },
  cost: { type: Number, required: true },
  currency_code: { type: String, required: true },
  repayments: [RepaymentSchema], // Array of repayments
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: UserSchema, required: true }, // Embed the UserSchema
  updated_at: { type: Date, default: Date.now },
  updated_by: { type: UserSchema, required: true }, // Embed the UserSchema
  deleted_at: { type: Date },
  deleted_by: { type: UserSchema },
  category: { type: CategorySchema, required: true }, // Embed the CategorySchema
  receipt: {
    large: { type: String },
    original: { type: String },
  },
  users: [ExpenseUserSchema], // Array of users involved in the expense
});

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;