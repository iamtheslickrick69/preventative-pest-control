import Anthropic from "@anthropic-ai/sdk"

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = 10 // requests per window
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimit.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (userLimit.count >= RATE_LIMIT) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(req: Request) {
  // Get IP address for rate limiting
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"

  // Check rate limit
  if (!checkRateLimit(ip)) {
    return Response.json(
      {
        text: "You've sent too many messages. Please wait a minute before trying again, or call us at (435) 256-6391 for immediate assistance!",
      },
      { status: 429 }
    )
  }

  const { messages, systemContext } = await req.json()

  // Initialize Anthropic client
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  // Convert messages to Anthropic format (must start with user message)
  const anthropicMessages = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: m.content,
  }))

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1024,
      system: systemContext,
      messages: anthropicMessages,
    })

    // Extract text from the response
    const text = message.content[0].type === "text" ? message.content[0].text : ""

    return Response.json({ text })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        text: "I apologize, but I'm having trouble responding right now. Please call us at (435) 256-6391 for immediate assistance!",
      },
      { status: 500 },
    )
  }
}
