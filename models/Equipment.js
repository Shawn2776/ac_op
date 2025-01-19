import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  hourlyRate: { type: Number, required: true },
  dailyRate: { type: Number, required: true },
  stock: { type: Number, required: true }, // Quantity available for rent
  description: { type: String }, // Optional
  studentDiscount: { type: Number, default: 0 }, // Discount percentage (e.g., 10 for 10%)
});

export default mongoose.models.Equipment ||
  mongoose.model("Equipment", EquipmentSchema);
