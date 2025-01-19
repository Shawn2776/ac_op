import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { name, description } = await request.json();

    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const category = new Category({ name, description });
    await category.save();

    return new Response(JSON.stringify({ success: true, data: category }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding category:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to add category" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
