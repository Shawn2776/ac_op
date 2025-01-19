import { connectMongoDB } from "@/lib/mongodb";
import Equipment from "@/models/Equipment";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { name, category, hourlyRate, dailyRate, stock, studentDiscount } =
      await request.json();

    if (!name || !category || !hourlyRate || !dailyRate || !stock) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const equipment = new Equipment({
      name,
      category,
      hourlyRate,
      dailyRate,
      stock,
      studentDiscount,
    });

    await equipment.save();

    return new Response(JSON.stringify({ success: true, data: equipment }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding equipment:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add equipment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
