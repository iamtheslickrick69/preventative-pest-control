import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with API key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      phone,
      email,
      service,
      area,
      urgency,
      message,
      wantsOffer,
      agreesToTerms,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !service || !area || !urgency) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!agreesToTerms) {
      return NextResponse.json(
        { error: "Must agree to terms" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate phone format (basic)
    const phoneRegex = /^\d{10}$/
    const cleanPhone = phone.replace(/\D/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Construct email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2D5F3C; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #2D5F3C; }
            .value { margin-top: 5px; }
            .urgent { background-color: #FF5722; color: white; padding: 10px; text-align: center; margin-bottom: 20px; }
            .offer { background-color: #fff3cd; padding: 10px; border-left: 4px solid #FF5722; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐛 New Contact Form Submission</h1>
              <p>Preventive Pest Control</p>
            </div>

            ${urgency === "urgent" ? '<div class="urgent"><strong>⚡ URGENT REQUEST</strong> - Customer needs immediate service!</div>' : ""}

            <div class="content">
              <h2>Customer Information</h2>

              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>

              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${cleanPhone}">${phone}</a></div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <div class="label">Service Requested:</div>
                <div class="value">${service}</div>
              </div>

              <div class="field">
                <div class="label">Service Area:</div>
                <div class="value">${area}</div>
              </div>

              <div class="field">
                <div class="label">Urgency:</div>
                <div class="value">${urgency === "urgent" ? "🔴 Urgent - Within 24 hours" : urgency === "week" ? "🟡 This Week" : "🟢 Flexible"}</div>
              </div>

              ${message ? `
                <div class="field">
                  <div class="label">Message:</div>
                  <div class="value">${message}</div>
                </div>
              ` : ""}

              ${wantsOffer ? '<div class="offer"><strong>💰 Customer wants $39.95 first service offer</strong></div>' : ""}
            </div>
          </div>
        </body>
      </html>
    `

    // Send email using Resend
    const data = await resend.emails.send({
      from: "Preventive Pest Control <onboarding@resend.dev>", // You'll need to update this with your verified domain
      to: process.env.CONTACT_EMAIL || "info@preventivepestcontrol.com",
      replyTo: email,
      subject: `${urgency === "urgent" ? "🚨 URGENT" : "📋 New"} Contact Form: ${firstName} ${lastName} - ${service}`,
      html: emailHTML,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Preventive Pest Control <onboarding@resend.dev>",
      to: email,
      subject: "Thank You for Contacting Preventive Pest Control",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2D5F3C; color: white; padding: 20px; text-align: center; }
              .content { background-color: #f9f9f9; padding: 20px; }
              .cta { background-color: #FF5722; color: white; padding: 15px 30px; text-decoration: none; display: inline-block; margin: 20px 0; border-radius: 8px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${firstName}!</h1>
              </div>
              <div class="content">
                <p>We've received your request for <strong>${service}</strong> service.</p>

                ${urgency === "urgent"
                  ? "<p><strong>We understand this is urgent.</strong> A team member will contact you within 2 hours during business hours (Mon-Fri 7am-6pm, Sat 8am-4pm).</p>"
                  : "<p>A team member will contact you within 24 hours to schedule your service.</p>"
                }

                ${wantsOffer
                  ? '<p style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #FF5722;"><strong>💰 Your $39.95 first service offer has been noted!</strong> We\'ll apply this discount when scheduling your appointment.</p>'
                  : ""
                }

                <p><strong>Need immediate assistance?</strong></p>
                <p>Call us at: <a href="tel:4352566391" style="color: #2D5F3C; font-size: 18px; font-weight: bold;">(435) 256-6391</a></p>

                <p style="margin-top: 30px;">
                  <strong>Preventive Pest Control</strong><br>
                  946 W Sunset Blvd Ste P<br>
                  St. George, UT 84770<br>
                  <br>
                  Mon-Fri: 7am-6pm<br>
                  Sat: 8am-4pm<br>
                  Emergency: 24/7
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully"
    })

  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again or call (435) 256-6391." },
      { status: 500 }
    )
  }
}
