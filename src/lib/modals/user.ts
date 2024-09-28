import { model, models, Schema } from "mongoose";

const PictureSchema = new Schema({
  small: { type: String, required: true },
  medium: { type: String, required: true },
  large: { type: String, required: true },
});

const NotificationSchema = new Schema({
  added_as_friend: { type: Boolean, default: true },
  added_to_group: { type: Boolean, default: true },
  expense_added: { type: Boolean, default: false },
  expense_updated: { type: Boolean, default: false },
  bills: { type: Boolean, default: true },
  payments: { type: Boolean, default: true },
  monthly_summary: { type: Boolean, default: true },
  announcements: { type: Boolean, default: true },
});

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: false },
  picture: { type: PictureSchema, required: false },
  custom_picture: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registration_status: { type: String, required: false },
  force_refresh_at: { type: Date, required: false },
  locale: { type: String, required: false },
  country_code: { type: String, required: false },
  date_format: { type: String, required: false },
  default_currency: { type: String, required: false },
  default_group_id: { type: Number, default: -1 },
  notifications_read: { type: Date, required: false },
  notifications_count: { type: Number, required: false },
  notifications: { type: NotificationSchema, required: false },
});

const User = models.User || model("User", UserSchema);

export default User;

export { UserSchema }
