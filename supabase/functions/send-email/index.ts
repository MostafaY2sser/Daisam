import "@supabase/functions-js/edge-runtime.d.ts"

Deno.serve(async (req) => {
  try {
    const { name, phone, employer, propertyType, message } = await req.json()

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Daisam <onboarding@resend.dev>",
        to: ["sales@daisam.sa"],
        subject: "New Financing Request",
        html: `
          <h3>New Financing Request</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Employer:</strong> ${employer}</p>
          <p><strong>Property Type:</strong> ${propertyType}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      }),
    })

    const result = await response.json()

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    })
  }
})