import Category from "@/models/Category";
import Equipment from "@/models/Equipment";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Seed data
const categories = [{ name: "Summer Rentals" }, { name: "Winter Rentals" }];

const equipment = [
  {
    name: "14' Hobie Wave Sailboat",
    category: "Summer Rentals",
    hourlyRate: 45,
    dailyRate: 120,
    stock: 5,
    studentDiscount: 15, // 15% discount for students
  },
  {
    name: "Stand Up Paddleboard",
    category: "Summer Rentals",
    hourlyRate: 25,
    dailyRate: 70,
    stock: 10,
    studentDiscount: 10, // 10% discount for students
  },
  {
    name: "Backcountry (AT) Ski",
    category: "Winter Rentals",
    hourlyRate: 15,
    dailyRate: 30,
    stock: 8,
    studentDiscount: 20, // 20% discount for students
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log("Categories Seeded:", createdCategories);

    // Map equipment categories
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // Update equipment to reference categories by ObjectId
    const equipmentWithCategoryIds = Equipment.map((item) => ({
      ...item,
      category: categoryMap[item.category],
    }));

    // Seed Equipment
    const createdEquipment = await Equipment.insertMany(
      equipmentWithCategoryIds
    );
    console.log("Equipment Seeded:", createdEquipment);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
