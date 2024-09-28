import { models, model, Schema } from "mongoose";


const MemberSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  picture: {
    small: { type: String },
    medium: { type: String },
    large: { type: String }
  },
  custom_picture: { type: Boolean, default: false },
  email: { type: String, required: true },
  registration_status: { type: String, required: true },
  balance: [
    {
      currency_code: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

const Member = models.Member || model("Member", MemberSchema);

export default Member;