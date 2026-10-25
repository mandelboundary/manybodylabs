import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      );
    }

    // In production, integrate with Substack API or CRM webhook endpoint
    console.log(`[ManyBody Labs Dispatch] New subscriber enqueued: ${email}`);

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed ${email} to ManyBody Labs Dispatch.`,
      publication: "manybodylabs.substack.com",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
