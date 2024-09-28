import { Schema, models, model } from "mongoose";
import { DebtSchema } from "./dept";

const GroupSchema = new Schema({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  simplify_by_default: { type: Boolean, default: false },
  original_debts: [DebtSchema],
  simplified_debts: [DebtSchema],
  group_type: { type: String, required: true },
  invite_link: { type: String },
  avatar: {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
    xlarge: { type: String },
    xxlarge: { type: String },
  },
  tall_avatar: {
    large: { type: String },
    xlarge: { type: String },
  },
  custom_avatar: { type: Boolean, default: false },
  cover_photo: {
    xxlarge: { type: String },
    xlarge: { type: String },
  },
});

const Group = models.Group || model("Group", GroupSchema);

export default Group;
