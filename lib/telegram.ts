export interface TelegramMessage {
  name: string
  email: string
  phone?: string
  project?: string
  budget?: string
  message: string
}

export async function sendTelegramMessage(data: TelegramMessage): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    console.error("Telegram credentials not configured")
    throw new Error("Telegram configuration missing")
  }

  const messageText = `
🔔 New Contact Form Submission

👤 Name: ${data.name}
📧 Email: ${data.email}
${data.phone ? `📱 Phone: ${data.phone}` : ""}
${data.project ? `🎯 Project Type: ${data.project}` : ""}
${data.budget ? `💰 Budget: ${data.budget}` : ""}

💬 Message:
${data.message}

🕐 Time: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })}
  `.trim()

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      }
    )

    const result = await response.json()

    if (!response.ok || !result.ok) {
      console.error("Telegram API error:", result)
      throw new Error(result.description || "Failed to send message to Telegram")
    }

    return true
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    throw error
  }
}
