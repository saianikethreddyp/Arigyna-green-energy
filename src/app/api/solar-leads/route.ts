import { isSolarLeadPayload } from "@/lib/solar-lead";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, code: "invalid_json" },
      { status: 400 },
    );
  }

  if (!isSolarLeadPayload(payload)) {
    return Response.json(
      { ok: false, code: "invalid_solar_lead" },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.SOLAR_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      {
        ok: false,
        code: "delivery_not_configured",
        message:
          "Form delivery is not configured. No enquiry has been sent or stored.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, code: "delivery_failed" },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { ok: false, code: "delivery_failed" },
      { status: 502 },
    );
  }
}
