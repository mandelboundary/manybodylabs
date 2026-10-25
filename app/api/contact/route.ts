import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, projectScope } = await req.json();

    if (!name || !email || !projectScope) {
      return NextResponse.json(
        { error: "Name, email, and project scope are required fields." },
        { status: 400 }
      );
    }

    console.log(`[ManyBody Labs Project Intake] Lead: ${name} (${email}) - ${company}`);

    return NextResponse.json({
      success: true,
      message: "Architecture inquiry received. We will respond within 1 business day.",
      ref_id: "mbl_" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit project inquiry" },
      { status: 500 }
    );
  }
}
