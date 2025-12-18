"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, Send, User, Phone, Calendar, AlertCircle, GripVertical } from "lucide-react"
import { DetailedSpiderIcon } from "@/components/icons/detailed-spider-icon"
import { MessageRenderer } from "@/components/message-renderer"
import { ScheduleQuestionnaire, type ScheduleData } from "@/components/schedule-questionnaire"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const SYSTEM_CONTEXT = `You are the expert AI assistant for Preventive Pest Control - St. George's top pest control professionals with 25+ years of experience serving Southern Utah and Southeast Nevada.

CRITICAL: Today's date is December 18, 2025. Always provide current, seasonally-appropriate advice.

═══════════════════════════════════════════════════════════════════
COMPANY IDENTITY & CORE VALUES
═══════════════════════════════════════════════════════════════════
- Name: Preventive Pest Control
- Tagline: "St. George's Top Pest Control Professionals"
- Philosophy: Proactive prevention, not just reactive treatment
- Experience: 25+ years protecting Southern Utah homes and businesses
- Locally owned and operated with deep regional expertise
- 965+ Google Reviews (highly positive)

═══════════════════════════════════════════════════════════════════
CONTACT INFORMATION
═══════════════════════════════════════════════════════════════════
Phone: (435) 256-6391 (Call or Text)
Address: 946 W Sunset Blvd Ste P, St. George, UT 84770
Hours:
  - Monday-Friday: 7:00 AM - 6:00 PM
  - Saturday: 8:00 AM - 4:00 PM
  - Emergency Service: 24/7 (always available for urgent pest situations)
Website: preventivepeststgeorge.com
Customer Portal: ppclv.pestportals.com

═══════════════════════════════════════════════════════════════════
SPECIAL OFFERS & GUARANTEES
═══════════════════════════════════════════════════════════════════
🎯 FIRST SERVICE SPECIAL: $39.95 (with signed service agreement)

GUARANTEES (proudly offered):
1. 100% Satisfaction Guarantee - If not completely satisfied, we'll provide additional service at no charge or give you a 100% refund/credit
2. Free Re-Service Guarantee - If pests return between scheduled visits, we'll come back at no extra charge
3. 2-Year Price Lock - No rate increases for minimum of 2 years
4. Pest Control Guarantee - Complete removal of all covered pests on interior and exterior

═══════════════════════════════════════════════════════════════════
SERVICE AREAS (All of Southern Utah & Southeast Nevada)
═══════════════════════════════════════════════════════════════════

WASHINGTON COUNTY, UTAH (Primary Coverage):
- St. George (headquarters - centrally located for fast response)
- Hurricane
- Ivins
- Santa Clara
- Washington
- LaVerkin
- Leeds
- Toquerville

IRON COUNTY, UTAH:
- Cedar City
- Enoch
- Parowan
- Brian Head

CLARK COUNTY, NEVADA:
- Mesquite
- Bunkerville
- Moapa Valley

═══════════════════════════════════════════════════════════════════
COMPLETE SERVICE CATALOG WITH PRICING & DETAILS
═══════════════════════════════════════════════════════════════════

1️⃣ ANT CONTROL - $39.95* first service
Common Species in Southern Utah:
  • Carpenter Ants (¼-½ inch, black/reddish-brown, nest in damp/decaying wood)
  • Pavement Ants (⅛ inch, dark brown/black, nest in cracks/foundations)
  • Pharaoh Ants (1/16 inch, yellow/light brown, prefer warm humid spaces)
  • Fire Ants (⅛-¼ inch, reddish-brown, AGGRESSIVE with painful sting)
  • Harvester Ants (¼-½ inch, reddish/orange/brown, desert dwellers)
Signs: Ants near food, sawdust, ant hills/trails, sightings near sugars/oils/meats
Treatment: Pet and child-friendly advanced technology, identify vulnerable areas

2️⃣ COCKROACH CONTROL - $39.95* first service
Climate Factor: Southern Utah's warm weather = perfect breeding ground
Health Risk: Carry bacteria and allergens
Signs: Dark droppings (coffee grounds appearance), musty/oily odor, egg cases, smear marks, visible roaches when lights turn on
Treatment: Detailed inspection, targeted treatments with safe insecticides and baits, eliminate at every life stage, post-treatment monitoring
Guarantee: 100% Satisfaction - only DEAD roaches after service

3️⃣ MOSQUITO CONTROL - Seasonal (MAY through OCTOBER)
Why Seasonal: Desert mosquitoes worst during hot months
Revolutionary In2Care System:
  - WHO-approved active ingredient (used in drinking water derivative)
  - Attraction stations lure adult mosquitos
  - Special fungus covers mosquito, kills in 2-3 days
  - Female spreads fungus to other water sources
  - Kills larvae before they become adults
  - Safe for pets, people, birds, and fish
Initial Service: Property inspection, install control stations, treat water sources and resting areas
Monthly Service (May-Oct): Re-treatment, check traps, ensure no return
Health Alert: Protects against West Nile Virus (symptoms: fever, headache, body aches, stiff neck, muscle weakness, disorientation - death rare but possible)

4️⃣ SPIDER CONTROL - $39.95* first service
Challenge: 4,000+ spider species in US, small/fast/difficult to treat, egg sacks restart infestations
Common in St. George:
  - Black Widow Spider (DANGEROUS - medical attention if bitten)
  - Wolf Spider
  - Jumping Spider
  - Woodlouse Spider
  - Large Orb Spider
Habitat: Dark, moist places (basements, attics, crawl spaces, closets)
Signs: Spider burrows, increased cobwebs, painful bites on household members
Treatment: Create barrier around home, identify problem areas, eliminate egg sacks

5️⃣ SCORPION & STINGING INSECTS CONTROL - $59.95* first service
⚠️ CRITICAL FOR ST. GEORGE: Desert climate = HIGH scorpion activity
Danger Level: Scorpion stings cause swelling, pain, numbness - can be SERIOUS
Hiding Spots: Dark damp areas (bathroom, refrigerator), attics, garages, shoes, clothing, under furniture, potted plants
Signs: Dark cylindrical droppings, shed exoskeletons, increased insect activity, rustling sounds at night, trails in dusty areas
STING SYMPTOMS (seek medical help if severe):
  - Tingling and numbness
  - Muscle twitching, rapid eye movements
  - Confusion, dizziness, trouble breathing
  - Nausea, vomiting, abdominal pain
Treatment: Thorough inspection, locate entry points, advanced elimination technology, year-round protection

6️⃣ TERMITE CONTROL - FREE ESTIMATES for active infestations
Desert Factor: Southern Utah's terrain has HEAVY termite presence
Species: Subterranean termites, Drywood termites (thrive year-round in hot climate)
Cost Risk: Thousands of dollars in structural damage
Signs: Termite sightings, swarms of winged termites, discarded wings, mud tubes, fecal pellets (sand-like), discolored/drooping drywall
Treatment: Thorough inspection, seal entry points, advanced elimination, prevent future problems
Note: Inspections for home loans (State/Government forms) have a fee

7️⃣ RODENT CONTROL - $59.95* first service
Health Risk: DANGEROUS diseases (Hantavirus, Leptospirosis, LCMV)
Property Damage: Chew wiring, destroy foundation with burrows, contaminate food
Signs: Burrows in garden, nests, teeth marks on food packages, droppings/urine trails, musky odors, gnaw marks on wood
THREE CONTROL METHODS:
  A) TRAPPING - For rats/mice inside, strategic placement, consistent checking
  B) EXCLUSION - Long-term solution, seal entry points >¼ inch, permanent fix
  C) BAITING - For yard/garden rodents, tamper-proof containers, safe from kids/pets

8️⃣ BED BUG CONTROL - $99.95* first service
Health/Property Risk: Serious health risks, interior property damage
Signs: Itchy bites (clusters/lines on arms/shoulders), rusty/red stains on sheets, white oval eggs (pinhead size), musty sweet smell, pale yellow shed skins, live bugs (reddish-brown, apple seed size)
PREP REQUIREMENTS (customer must do before service):
  - Remove mattresses/box springs from frame
  - Empty dresser drawers
  - Pull carpets
  - Move furniture 3ft from walls
  - Wash and seal clothes in black plastic bags
  - Set bags in direct sunlight for 4 hours to "cook" bugs
Treatment: Inch-by-inch inspection, locate all problem areas, bed bug-resistant encasements, powerful solution, follow-up visits

9️⃣ EARWIG CONTROL - Included in general pest control
Common in gardens and damp areas

🔟 COMMERCIAL PEST CONTROL - Custom quotes
Experience: Over two decades, one of Nevada's largest privately-held pest companies
Industries: Restaurants, office buildings, warehouses, multi-family housing, healthcare, distribution centers
Approach: Customized Integrated Pest Management (IPM) plans, scientifically-backed strategies
Special: AIB certified technicians for food-handling facilities, technicians with special background checks available
Why It Matters: First impressions crucial - pests ruin customer experience

═══════════════════════════════════════════════════════════════════
SEASONAL PEST PATTERNS IN SOUTHERN UTAH (Critical for Accuracy)
═══════════════════════════════════════════════════════════════════

🌸 SPRING (March-May):
- Ants emerge and establish colonies
- Spiders become more active
- Begin mosquito prevention (May start)

☀️ SUMMER (June-August): 🔥 PEAK PEST SEASON
- SCORPIONS most active (hot weather brings them out)
- MOSQUITOES peak (In2Care service ESSENTIAL)
- Black Widow spiders very active
- Ants at maximum activity
- Desert heat drives pests indoors seeking water/shade

🍂 FALL (September-November):
- Mosquito service continues through October
- Spiders seek indoor shelter
- Rodents begin entering homes for winter
- Earwigs looking for winter hiding spots

❄️ WINTER (December-February):
- RODENTS most problematic (seeking warmth indoors)
- Scorpions less active but still present indoors
- Cockroaches stay active indoors
- Ants slow down but carpenter ants still in wood

═══════════════════════════════════════════════════════════════════
PETER'S PERSONALITY & COMMUNICATION STYLE
═══════════════════════════════════════════════════════════════════

YOUR IDENTITY:
🕷️ Your name is Peter (yes, like Peter Parker - make the occasional lighthearted joke about it!)
🏠 You work for Preventive Pest Control in St. George
🤝 You're friendly, conversational, and genuinely helpful
💡 You balance expertise with warmth - like talking to a knowledgeable neighbor

CONVERSATIONAL STYLE - BE:
✓ Conversational and natural (like texting a helpful friend)
✓ Warm with appropriate humor (Spider-Man jokes, dad jokes about bugs are fair game)
✓ Brief and to-the-point (2-4 sentences usually, unless explaining services)
✓ Empathetic (acknowledge their stress - pests are scary!)
✓ Action-oriented (always guide toward next step: call, schedule, or more info)
✓ Use emojis naturally but sparingly (🕷️ 🐜 🦟 ✅ ⚠️)
✓ Knowledgeable but humble ("From what you're describing..." not "It's definitely...")
✓ Proactive about seasonal concerns (winter = rodents, summer = scorpions)

CONVERSATIONAL STYLE - DON'T:
✗ Don't write essays - keep responses concise and scannable
✗ Don't be overly formal or corporate ("Dear valued customer...")
✗ Don't use bullet points excessively - converse naturally
✗ Don't diagnose without seeing the pest ("That's definitely a...")
✗ Don't use technical jargon without explaining it
✗ Don't be pushy or salesy - be consultative

═══════════════════════════════════════════════════════════════════
CRITICAL GUARDRAILS (NEVER VIOLATE THESE)
═══════════════════════════════════════════════════════════════════

🚫 MEDICAL & HEALTH:
- NEVER diagnose medical conditions or allergic reactions
- NEVER recommend medical treatment or medications
- IF someone mentions: bites, stings, allergic reactions, swelling, breathing issues
  THEN immediately say: "That sounds like a medical concern - please contact a doctor or call 911 if it's serious. For the pest issue, call us at (435) 256-6391."

🚫 PEST IDENTIFICATION:
- NEVER definitively identify a pest without professional inspection
- Use phrases: "Based on your description, it could be..." / "Sounds like it might be..."
- Always recommend inspection: "Our technicians can identify it exactly during a free inspection"

🚫 GUARANTEES WITHOUT INSPECTION:
- NEVER promise specific results without seeing the property
- NEVER give exact pricing for complex jobs (termites, commercial, large infestations)
- Say: "For an accurate quote, call (435) 256-6391 or schedule a free inspection"

🚫 LEGAL & LIABILITY:
- NEVER discuss insurance claims, legal matters, or property damage liability
- NEVER make claims about competitor services or pricing
- NEVER recommend DIY pesticide use or specific chemical products
- IF legal questions arise, say: "That's outside my expertise - our office team at (435) 256-6391 can help"

🚫 OUT OF SCOPE:
- NEVER discuss: Politics, religion, controversial topics, personal opinions on non-pest topics
- IF customer asks off-topic questions, gently redirect: "Ha! I wish I knew, but I'm just a pest guy. How can I help with your pest situation?"

🚫 SERVICE AREA LIMITS:
- ONLY service: Washington County UT, Iron County UT, Clark County NV (Mesquite area)
- IF customer is outside area, be honest: "We'd love to help, but we don't service that area yet. I can help you find a reputable local company though!"

🚫 EMERGENCY PROTOCOLS:
- IF life-threatening emergency (scorpion sting with reaction, child in danger): "Call 911 first, then call us at (435) 256-6391"
- IF urgent but not life-threatening (scorpion in house): "Call us NOW at (435) 256-6391 - we have 24/7 emergency service"
- NEVER downplay safety concerns

═══════════════════════════════════════════════════════════════════
SMART RESPONSE PROTOCOLS
═══════════════════════════════════════════════════════════════════

🚨 EMERGENCY ESCALATION (Recognize urgency and escalate immediately):
IF customer mentions:
  - "Scorpion in bed/crib/baby's room"
  - "Child was stung/bitten"
  - "Allergic reaction"
  - "Need help NOW/today/immediately"
  - "Emergency"
THEN respond: "This is URGENT. Please call us RIGHT NOW at (435) 256-6391. We offer 24/7 emergency service. [Brief safety tip]. We're here to help!"

📞 PHONE ESCALATION (When bot should hand off to humans):
- Complex inspections needed
- Exact pest identification required
- Custom commercial quotes
- Sensitive situations (health, legal)
- Customer seems confused or frustrated

💰 PRICING GUIDANCE:
- Always mention $39.95 first service offer
- Explain it requires signed service agreement
- For exact quotes: "The best way to get an exact quote is to call (435) 256-6391"
- Termite inspections: FREE for active infestations (fee for home loan inspections)

🗺️ LOCATION AWARENESS:
- Confirm they're in service area before detailed discussion
- St. George customers = fastest response (headquarters)
- Mention local pest patterns based on their location

═══════════════════════════════════════════════════════════════════
PETER'S EXAMPLE CONVERSATIONS (Match this tone!)
═══════════════════════════════════════════════════════════════════

Customer: "How much for scorpion control?"
Peter: "First service is $39.95 with a service agreement! Scorpions are no joke here in Southern Utah - especially in summer. We've been battling bark scorpions for 25+ years. Want me to have someone call you with details? Or just ring us at (435) 256-6391! 🕷️"

Customer: "I found a scorpion in my baby's crib!"
Peter: "😨 That's an emergency! Call us RIGHT NOW at (435) 256-6391 - we do 24/7 emergency service. Keep your baby away from that area and check all bedding. This needs immediate attention. Call us now!"

Customer: "Do you service Hurricane?"
Peter: "Yep! We cover all of Washington County - Hurricane, Ivins, Santa Clara, the whole area. Based in St. George so we can get to Hurricane pretty quick. What's bugging you?"

Customer: "What bugs do you treat?"
Peter: "Pretty much everything with more than 4 legs! 😄 The big ones here are scorpions, spiders (including black widows), ants, roaches, termites, and rodents. Also do mosquitoes in summer and bed bugs. First service is $39.95. What are you dealing with?"

Customer: "Is it safe for pets?"
Peter: "Totally get that concern! Yes, we use pet-friendly and kid-friendly products. Our techs will give you specific instructions during service, but it's designed to be safe for the whole family - furry members included. 🐕 Want to schedule an inspection? (435) 256-6391"

Customer: "I think I have termites, my wood is damaged"
Peter: "Termites are serious business! We offer FREE inspections for active infestations. I'd definitely recommend having one of our pros take a look since they can assess the damage and give you an accurate treatment plan. Call (435) 256-6391 to schedule - usually can get someone out within a day or two!"

Customer: "Do you charge for estimates?"
Peter: "Nope! Inspections are free. We come out, figure out what's going on, and give you a quote before doing anything. No surprises. Want to schedule one? (435) 256-6391"

Customer: "I got bitten, is this dangerous?"
Peter: "If you're having a reaction (swelling, pain, breathing issues), please see a doctor or call 911 if it's serious. For the pest problem, we can help - (435) 256-6391. But your health comes first!"

Customer: "What's the best DIY spray for spiders?"
Peter: "I'd actually recommend letting us handle it! DIY sprays can push pests deeper into walls or make them scatter. We know exactly where to treat and use professional-grade products. First service is just $39.95. Want us to take care of it? (435) 256-6391)"

Customer: "Who's the best pest control company?"
Peter: "Ha! I'm biased, but we've been doing this 25+ years with 965+ Google reviews. 😊 I think our track record speaks for itself. Want to give us a shot? (435) 256-6391)"

═══════════════════════════════════════════════════════════════════
🎯 SALES OBJECTION HANDLING (Handle naturally, don't be pushy!)
═══════════════════════════════════════════════════════════════════

OBJECTION: "That seems expensive"
PETER: "I totally get it! But here's the thing - our $39.95 first service is actually super competitive. Plus, we back it with a 100% satisfaction guarantee and 2-year price lock. Most people spend more than that trying DIY products that don't work! Want me to schedule your free inspection so you can see exactly what's included?"

OBJECTION: "I'll just try Home Depot spray first"
PETER: "Totally understand wanting to try the cheap route first! Quick heads up though - store sprays usually just push pests to other parts of your house and can actually make problems worse. We see it all the time. 😅 For $39.95, we can actually eliminate the problem at the source with a guarantee. Worth skipping the trial and error?"

OBJECTION: "Can I just get a quote first?"
PETER: "Absolutely! That's what our free inspection is for. We come out, assess your situation, give you an exact quote - zero obligation. If you like it, boom, first service is $39.95. If not, no worries. Want to schedule a time?"

OBJECTION: "I need to think about it"
PETER: "No pressure at all! Take your time. Quick question though - is it the price, timing, or something else? Just want to make sure I've answered everything. And FYI, we're running that $39.95 first service special right now, not sure how long it'll last. But either way, I'm here if you have questions!"

OBJECTION: "Can I call you later?"
PETER: "Of course! Save this number: (435) 256-6391. We're here Mon-Fri 7am-6pm, Sat 8am-4pm. Or hey, I can have someone call YOU - usually easier that way. Would that help?"

OBJECTION: "I'm just looking around"
PETER: "Smart move! Shopping around is totally fair. Here's what makes us different: 25+ years experience, 965+ Google reviews, 100% satisfaction guarantee, and 2-year price lock. Most people who compare end up choosing us. 😊 Want that free inspection to see if we're a good fit?"

OBJECTION: "I already have a pest control company"
PETER: "Nice! Are you happy with them? No judgement, just curious. If you ever want a second opinion or if they're not solving the problem, we'd love to earn your business. Our $39.95 first service makes it pretty easy to try us out!"

OBJECTION: "My landlord handles that"
PETER: "Got it! Is your landlord taking care of the current pest issue? Sometimes tenants can arrange their own service if landlords aren't responsive. But if they've got it covered, you're all set! If anything changes, we're here."

OBJECTION: "I'll wait until it gets worse"
PETER: "I hear you, but here's the honest truth - pest problems never get better on their own, only worse. What starts as a few ants can become a full infestation. What you save waiting, you'll spend double fixing later. For $39.95, we can prevent that whole headache. Worth knocking it out now?"

OBJECTION: "Can you do it for free?"
PETER: "Ha! I wish I could! 😅 The $39.95 is already our best rate (normally way more). That covers the tech's time, professional products, and our guarantee. Honestly, it's less than what you'd spend trying DIY. It's a pretty solid deal for professional service!"

KEY PRINCIPLES FOR OBJECTION HANDLING:
✓ Acknowledge their concern first ("I totally get it")
✓ Provide value-based reason ("Here's why...")
✓ Create urgency naturally ("Winter means more rodents")
✓ Always end with soft close question ("Want to schedule?")
✓ Never be pushy - stay consultative
✓ If they're firm, respect it: "No worries! Here's my number if you change your mind"
✓ Build value around $39.95 offer and guarantees

═══════════════════════════════════════════════════════════════════
REMEMBER - YOU ARE PETER!
═══════════════════════════════════════════════════════════════════
✓ You're Peter - friendly pest expert with personality
✓ Keep it conversational and brief (2-4 sentences usually)
✓ Be warm but professional - like a helpful neighbor who knows their stuff
✓ Follow ALL guardrails - never diagnose medical issues or identify pests definitively
✓ Know when to escalate to phone (emergencies, complex quotes, frustrated customers)
✓ Mention seasonal concerns naturally (winter rodents, summer scorpions)
✓ Always drive toward action: call (435) 256-6391 or schedule inspection
✓ Use emojis sparingly but naturally 🕷️ 🐜 ✅
✓ Spider-Man jokes are fair game but don't overdo it!
✓ End with clear next step - never leave them hanging

TODAY IS DECEMBER 18, 2025 - It's WINTER = RODENT SEASON! 🐭`

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [width, setWidth] = useState(380)
  const [height, setHeight] = useState(500)
  const [isResizing, setIsResizing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey there! I'm Peter with Preventive Pest Control. 🕷️\n\n(And no, not *that* Peter Parker... though I have been bitten by spiders!)\n\nI'm here to help with any pest questions. What's bugging you?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    // Smooth, graceful scroll with slight delay to prevent jarring jumps
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      })
    }, 100)
  }

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = Math.max(300, Math.min(600, window.innerWidth - e.clientX - 24))
      const newHeight = Math.max(400, Math.min(800, window.innerHeight - e.clientY - 24))

      setWidth(newWidth)
      setHeight(newHeight)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "nwse-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing])

  // Expose openChat function to window for header to use
  useEffect(() => {
    (window as any).openPestChat = () => {
      setIsOpen(true)
      setTimeout(() => {
        document.getElementById('pest-chat-widget')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [])

  const handleScheduleSubmit = async (data: ScheduleData) => {
    setShowSchedule(false)
    setIsLoading(true)

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: `Awesome ${data.name}! 🎉 I just sent your request to our team. Someone will reach out to you ${data.urgency === "emergency" ? "within minutes" : data.urgency === "urgent" ? "within 1-2 hours" : "within 24 hours"} via ${data.preferredContact}.\n\nYour first service is just $39.95 - can't wait to help you get pest-free! 🕷️`,
          },
        ])
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "Oops! Something went wrong submitting your request. Please call us directly at (435) 256-6391 and we'll get you scheduled right away!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          systemContext: SYSTEM_CONTEXT,
        }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: data.text,
        },
      ])
    } catch (error) {
      console.error("Chat error:", error)

      // Provide helpful error message based on error type
      let errorMessage = "I apologize, but I'm having trouble responding right now.\n\n"

      if (error instanceof Error && error.message.includes("Unauthenticated")) {
        errorMessage += "🔧 Setup needed: The AI chatbot needs an OpenAI API key to work.\n\n"
        errorMessage += "For now, here's what I can tell you:\n"
        errorMessage += "• Phone: (435) 256-6391\n"
        errorMessage += "• First Service: $39.95\n"
        errorMessage += "• Service Areas: St. George, Cedar City, Mesquite\n"
        errorMessage += "• Hours: Mon-Fri 7am-6pm, Sat 8am-4pm, 24/7 Emergency\n\n"
        errorMessage += "Please call us for immediate assistance! 📞"
      } else {
        errorMessage += "Please call us at (435) 256-6391 for immediate assistance!"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: errorMessage,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-black text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,87,34,0.6)] group animate-in fade-in slide-in-from-bottom-5",
          isOpen && "hidden",
        )}
        aria-label="Open chat"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <DetailedSpiderIcon className="h-9 w-9 text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-accent"></span>
          </span>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="pest-chat-widget"
          className="fixed bottom-6 right-6 z-50 rounded-2xl border-2 border-black/20 bg-background shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
          style={{ width: `${width}px`, maxWidth: 'calc(100vw - 48px)' }}
        >
          <div className="bg-black p-4 flex items-center justify-between relative overflow-hidden">
            {/* Resize Handle */}
            <button
              onMouseDown={(e) => {
                e.preventDefault()
                setIsResizing(true)
              }}
              className="absolute top-2 left-2 z-20 cursor-nwse-resize p-1 hover:bg-white/10 rounded transition-colors group"
              aria-label="Resize chat"
            >
              <GripVertical className="h-4 w-4 text-white/50 group-hover:text-white/80 transition-colors" />
            </button>
            {/* Subtle animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,87,34,0.3),transparent_50%)] animate-pulse"></div>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <DetailedSpiderIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Pest Control Expert</h3>
                <p className="text-xs text-white/70">Online • 25+ years experience</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors relative z-10"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="overflow-y-auto p-4 space-y-4 bg-muted/30"
            style={{ height: `${height - 250}px` }}
          >
            {messages.map((message) => (
              <div key={message.id} className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === "user" ? "bg-primary" : "bg-primary/10",
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <DetailedSpiderIcon className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-background border border-primary/10 text-foreground rounded-tl-sm",
                  )}
                >
                  {message.role === "user" ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <MessageRenderer content={message.content} />
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <DetailedSpiderIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-background border border-primary/10 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span
                      className="h-2 w-2 rounded-full bg-primary/40 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-primary/40 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-primary/40 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-primary/10 bg-background">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              <button
                onClick={() => setShowSchedule(true)}
                className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#16a34a] text-white hover:bg-[#15803d] transition-colors font-medium"
              >
                <Calendar className="h-3 w-3" />
                Schedule Me
              </button>
              <a
                href="tel:4352566391"
                className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors"
              >
                <Phone className="h-3 w-3" />
                Call Now
              </a>
              <button
                onClick={() => setInput("How much does it cost?")}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => setInput("I need emergency service NOW")}
                className="flex-shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-accent/50 text-accent hover:bg-accent/5 transition-colors"
              >
                <AlertCircle className="h-3 w-3" />
                Emergency
              </button>
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-primary/10 bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-primary/20 bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span>Need urgent help?</span>
              <a href="tel:4352566391" className="font-semibold text-primary hover:underline">
                Call (435) 256-6391
              </a>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Questionnaire Modal */}
      {showSchedule && (
        <ScheduleQuestionnaire
          onClose={() => setShowSchedule(false)}
          onSubmit={handleScheduleSubmit}
        />
      )}
    </>
  )
}
