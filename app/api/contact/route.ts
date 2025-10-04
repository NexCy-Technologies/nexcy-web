import { type NextRequest, NextResponse } from "next/server"
import { sendTelegramMessage } from "@/lib/telegram"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, project, budget, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Send message to Telegram
    try {
      await sendTelegramMessage({
        name,
        email,
        phone,
        project,
        budget,
        message,
      })
    } catch (telegramError) {
      console.error("Telegram send failed:", telegramError)
      // Continue even if Telegram fails - don't block the user
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
