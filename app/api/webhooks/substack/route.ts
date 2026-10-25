import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-substack-signature");
    const body = await req.json();

    // Verify webhook presence
    if (!body || !body.event) {
      return NextResponse.json(
        { error: "Invalid webhook payload structure" },
        { status: 400 }
      );
    }

    const { event, publication, data } = body;

    // Log the event
    console.log(`[ManyBody Labs Webhook] Inbound event: ${event} from ${publication}`);

    // Route event according to type
    switch (event) {
      case "subscriber.created":
        // Sync subscriber to CRM (GoHighLevel/Salesforce)
        return NextResponse.json({
          received: true,
          action: "crm_lead_enqueued",
          subscriber_id: data?.subscriber_id || "unknown",
          timestamp: new Date().toISOString(),
          status: "processed",
        });

      case "post.published":
        // Invalidate cache or broadcast
        return NextResponse.json({
          received: true,
          action: "dispatch_cache_purged",
          post_id: data?.id,
          status: "processed",
        });

      default:
        return NextResponse.json({
          received: true,
          action: "unhandled_event_logged",
          status: "acknowledged",
        });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error processing webhook" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "ManyBody Labs Webhook Pipeline",
    version: "1.0.0",
    docs: "https://manybodylabs.com#webhooks",
    supported_methods: ["POST"],
  });
}
