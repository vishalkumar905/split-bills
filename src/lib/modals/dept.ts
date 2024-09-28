import { Schema, model, models } from "mongoose";

const DebtSchema = new Schema({
  from: { type: Schema.Types.Number, ref: "Member", required: true },
  to: { type: Schema.Types.Number, ref: "Member", required: true },
  amount: { type: Number, required: true },
  currency_code: { type: String, required: true },
});

const Debt = models.Debt || model("Debt", DebtSchema);

export default Debt;

export { DebtSchema };