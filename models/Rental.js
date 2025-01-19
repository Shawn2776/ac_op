import mongoose from "mongoose";

const RentalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Returned"],
    default: "Pending",
  },
});

export default mongoose.models.Rental || mongoose.model("Rental", RentalSchema);
