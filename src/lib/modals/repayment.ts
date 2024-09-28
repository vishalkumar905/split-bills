import { Schema, models, model } from "mongoose";

const RepaymentSchema = new Schema({
  from: { type: Number, ref: "User", required: true },
  to: { type: Number, ref: "User", required: true },
  amount: { type: Number, required: true },
});

const Repayment = models.Repayment || model("Repayment", RepaymentSchema);

export default Repayment;

export { RepaymentSchema }
