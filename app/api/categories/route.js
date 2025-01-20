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

export async function GET() {
  await connectMongoDB();
  try {
    const categories = await Category.find();
    return new Response(JSON.stringify({ success: true, data: categories }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch categories" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// PATCH Method for Editing a Category
export async function PATCH(request) {
  await connectMongoDB();
  try {
    const { id, name, description } = await request.json();
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!category) {
      return new Response(
        JSON.stringify({ success: false, message: "Category not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true, data: category }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to update category" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// DELETE Method for Deleting a Category
export async function DELETE(request) {
  await connectMongoDB();
  try {
    const { id } = await request.json();
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return new Response(
        JSON.stringify({ success: false, message: "Category not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to delete category" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
