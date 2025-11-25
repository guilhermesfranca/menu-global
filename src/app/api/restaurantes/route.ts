import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { RestaurantModel } from "@/models/Restaurant";
import { getAuthUser } from "@/lib/auth";
import { slugify } from "@/lib/utils";

/**
 * GET /api/restaurantes
 * Lista todos os restaurantes (apenas ADMIN)
 */
export async function GET() {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    await connectDB();
    const restaurants = await RestaurantModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ restaurants });
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar restaurantes" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/restaurantes
 * Cria novo restaurante (apenas ADMIN)
 */
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { name, primaryColor, logo, defaultLanguage, enabledLanguages } =
      body;

    // Validações
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Nome do restaurante é obrigatório" },
        { status: 400 }
      );
    }

    await connectDB();

    // Gera slug único
    let slug = slugify(name);
    let slugExists = await RestaurantModel.findOne({ slug });
    let counter = 1;

    while (slugExists) {
      slug = `${slugify(name)}-${counter}`;
      slugExists = await RestaurantModel.findOne({ slug });
      counter++;
    }

    // Cria restaurante
    const restaurant = await RestaurantModel.create({
      name: name.trim(),
      slug,
      primaryColor: primaryColor || "#667eea",
      logo: logo || "",
      defaultLanguage: defaultLanguage || "pt",
      enabledLanguages: enabledLanguages || ["pt"],
    });

    return NextResponse.json({ restaurant }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar restaurante:", error);
    return NextResponse.json(
      { error: "Erro ao criar restaurante" },
      { status: 500 }
    );
  }
}