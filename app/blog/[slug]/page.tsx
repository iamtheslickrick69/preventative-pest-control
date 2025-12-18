import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Clock, Share2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

const blogPosts: Record<
  string,
  {
    title: string
    excerpt: string
    author: string
    date: string
    category: string
    image: string
    readTime: string
    content: string[]
  }
> = {
  "scorpions-in-utah-guide": {
    title: "Scorpions in Utah: A Comprehensive Guide for Locals",
    excerpt: "Everything you need to know about Utah scorpions - from identification to prevention.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Scorpions",
    image: "/scorpion-utah-desert-bark-scorpion-close-up.jpg",
    readTime: "10 min read",
    content: [
      "Scorpions are one of the most feared pests in Southern Utah, and for good reason. While most species in our area aren't deadly, their stings can be extremely painful and cause allergic reactions in some people. Understanding these arachnids is the first step to protecting your family.",
      "## Common Scorpion Species in Utah",
      "The most common scorpion in Southern Utah is the Arizona Bark Scorpion (Centruroides sculpturatus). This species is the most venomous scorpion in North America and is particularly prevalent in Washington County. They're typically light brown to yellowish and grow to about 2-3 inches long.",
      "Other species you may encounter include the Giant Hairy Scorpion and the Stripe-Tailed Scorpion. While less dangerous than the Bark Scorpion, their stings can still cause significant pain and discomfort.",
      "## Where Scorpions Hide",
      "Scorpions are nocturnal creatures that seek cool, dark places during the day. Common hiding spots include: under rocks and debris in your yard, inside shoes and clothing left on the floor, in closets and storage areas, under bark and in woodpiles, and in wall voids and attics.",
      "## Signs of a Scorpion Infestation",
      "Unlike some pests, scorpions don't leave obvious signs of their presence. However, you may notice: increased sightings during evening hours, scorpions found in sinks or bathtubs (they can't climb smooth surfaces), and other pest infestations (scorpions follow their food source).",
      "## Prevention Tips",
      "To reduce scorpion activity around your home: seal cracks and gaps in your foundation and walls, remove debris and woodpiles from near your home, fix any moisture issues (scorpions need water), shake out shoes and clothing before putting them on, and use a UV blacklight to check for scorpions at night (they glow under UV light).",
      "## When to Call a Professional",
      "If you're seeing scorpions regularly inside your home, or if you've had a family member stung, it's time to call Preventive Pest Control. Our targeted scorpion treatments create a barrier around your home and eliminate existing populations.",
      "## What to Do If Stung",
      "If stung by a scorpion: clean the area with soap and water, apply a cold compress to reduce swelling, take over-the-counter pain medication if needed, and seek immediate medical attention if you experience difficulty breathing, muscle twitching, or severe symptoms.",
      "For small children, elderly individuals, or those with compromised immune systems, always seek medical attention immediately after a scorpion sting.",
    ],
  },
  "how-to-remove-cockroaches-apartment": {
    title: "How To Remove Cockroaches in an Apartment: A Step-by-Step Guide",
    excerpt:
      "Dealing with cockroaches in your apartment? Learn the most effective methods to eliminate these resilient pests.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Cockroaches",
    image: "/clean-kitchen-apartment-pest-control.jpg",
    readTime: "8 min read",
    content: [
      "Cockroaches in your apartment can feel overwhelming, but with the right approach, you can eliminate them and prevent future infestations. This guide will walk you through everything you need to know.",
      "## Why Apartments Are Prone to Cockroaches",
      "Apartments present unique challenges for cockroach control. Shared walls mean roaches can travel between units, and you have limited control over your neighbors' cleanliness. Additionally, apartment buildings often have extensive plumbing systems that provide moisture and travel routes for these pests.",
      "## Step 1: Deep Clean Your Space",
      "Start by eliminating food sources. Clean behind appliances, inside cabinets, and under furniture. Pay special attention to the kitchen - crumbs and grease are cockroach magnets. Don't forget to clean your garbage cans inside and out.",
      "## Step 2: Eliminate Water Sources",
      "Cockroaches can survive weeks without food but only days without water. Fix any leaky pipes or faucets, dry your sinks and bathtub before bed, empty and dry pet water bowls overnight, and use a dehumidifier in damp areas.",
      "## Step 3: Seal Entry Points",
      "Inspect your apartment for gaps and cracks. Common entry points include: around pipes under sinks, gaps in door frames, cracks in walls and baseboards, and spaces around electrical outlets.",
      "## Step 4: Use Targeted Treatments",
      "While over-the-counter products can help, professional treatment is often necessary for apartment infestations. At Preventive Pest Control, we use targeted baits and treatments that are safe for your family and pets.",
      "## Working With Your Landlord",
      "If cockroaches are coming from other units or common areas, you'll need your landlord's cooperation. Document the infestation with photos and written complaints. Many states require landlords to address pest issues.",
      "## Prevention Moving Forward",
      "Once you've eliminated the current infestation: maintain a regular cleaning schedule, store food in sealed containers, take out trash regularly, and schedule regular pest control treatments to prevent re-infestation.",
    ],
  },
  "what-are-harvester-ants": {
    title: "What are Harvester Ants?",
    excerpt: "Harvester ants are common in Southern Utah and can deliver painful stings.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Ants",
    image: "/harvester-ants-desert-colony-mound.jpg",
    readTime: "5 min read",
    content: [
      "If you've spent any time outdoors in Southern Utah, you've likely encountered harvester ants. These large, reddish-brown ants are known for their painful stings and impressive mound-building abilities.",
      "## Identifying Harvester Ants",
      "Harvester ants are among the larger ant species in Utah, typically measuring 1/4 to 1/2 inch long. They're usually red, reddish-brown, or black. Their most distinctive feature is the large, cleared area around their mound entrance - they remove all vegetation in a 3-10 foot radius.",
      "## Behavior and Habitat",
      "These ants get their name from their habit of 'harvesting' seeds. They collect seeds from surrounding areas and store them in underground chambers. A single colony can contain thousands of workers and survive for 15-20 years.",
      "## The Sting",
      "Harvester ants have a powerful sting that's considered one of the most painful of any ant species. The venom contains allergens that can cause reactions in sensitive individuals. Multiple stings can be dangerous, especially for children and pets.",
      "## Control Methods",
      "Controlling harvester ants requires targeting the colony itself. Surface sprays are largely ineffective as they don't reach the queen deep underground. Professional treatments using specialized baits and dusts are the most effective solution.",
      "## When to Seek Professional Help",
      "If you have harvester ant mounds in your yard - especially near play areas, pools, or high-traffic zones - contact Preventive Pest Control. We'll eliminate the colony and help prevent new ones from establishing.",
    ],
  },
  "common-utah-spiders": {
    title: "Watch Out for These 10 Common Utah Spiders",
    excerpt: "From harmless house spiders to the dangerous Black Widow, learn to identify common Utah spiders.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Spiders",
    image: "/black-widow-spider-red-hourglass-web.jpg",
    readTime: "12 min read",
    content: [
      "Utah is home to over 600 species of spiders, but only a handful are commonly encountered by homeowners. Here's your guide to the 10 most common spiders in Southern Utah.",
      "## 1. Black Widow (Latrodectus hesperus)",
      "The most dangerous spider in Utah. Females are shiny black with a red hourglass marking on the underside. They prefer dark, undisturbed areas like garages, sheds, and woodpiles. Their bite requires immediate medical attention.",
      "## 2. Wolf Spider",
      "Large, hairy spiders that hunt at night. While intimidating, they're not aggressive and their bite is not dangerous to humans. They're actually beneficial as they eat other pests.",
      "## 3. Hobo Spider",
      "Brown spiders often found in basements and crawl spaces. Once thought to be highly venomous, recent research suggests their bites are not as dangerous as previously believed.",
      "## 4. Yellow Sac Spider",
      "Pale yellow spiders responsible for more bites than any other species. Their bite causes localized pain and swelling but is not medically significant for most people.",
      "## 5. Desert Recluse",
      "Related to the brown recluse but with less potent venom. Found in Southern Utah's desert areas. Bites can cause necrotic lesions in some cases.",
      "## Prevention Tips",
      "To reduce spider populations around your home: reduce clutter and hiding spots, seal cracks and crevices, install door sweeps and window screens, reduce outdoor lighting (which attracts insects that spiders eat), and schedule regular pest control treatments.",
      "## When to Call a Professional",
      "If you're seeing venomous spiders like Black Widows regularly, or if you have a significant spider population in your home, professional treatment is recommended. Contact Preventive Pest Control for safe, effective spider control.",
    ],
  },
  "nevada-scorpions-field-guide": {
    title: "Nevada Scorpions: A Comprehensive Field Guide",
    excerpt: "A complete field guide to scorpions in Nevada.",
    author: "Preventive Pest LV",
    date: "March 27, 2025",
    category: "Scorpions",
    image: "/nevada-desert-scorpion-rocks-night.jpg",
    readTime: "9 min read",
    content: [
      "Nevada's desert climate provides ideal conditions for scorpions. If you live in the Mesquite or Las Vegas area, understanding local scorpion species is essential for protecting your family.",
      "## Nevada's Most Common Scorpions",
      "The Arizona Bark Scorpion is the most medically significant species in Nevada. It's slender, light brown, and can climb walls and ceilings. The Desert Hairy Scorpion is Nevada's largest species but less dangerous.",
      "## Seasonal Activity",
      "Scorpion activity peaks from April through October when nighttime temperatures stay above 70°F. During winter months, they seek shelter and become largely inactive.",
      "## Nevada-Specific Prevention",
      "Desert landscaping common in Nevada can harbor scorpions. Remove decorative rock piles near your home, seal gaps around pool equipment, and keep palm tree bark trimmed (bark scorpions love palm trees).",
      "## Professional Treatment",
      "Our Clark County team specializes in scorpion control for the unique challenges of Nevada homes. Contact us for a comprehensive scorpion inspection and treatment plan.",
    ],
  },
  "bird-removal-101": {
    title: "Bird Removal 101: From Pigeons to Sparrows",
    excerpt: "Birds can cause significant property damage and health concerns.",
    author: "Preventive Pest LV",
    date: "March 27, 2025",
    category: "Birds",
    image: "/pigeons-on-building-roof-pest-control.jpg",
    readTime: "7 min read",
    content: [
      "While birds are a natural part of our environment, they can become serious pests when they roost on buildings. Their droppings are corrosive, carry diseases, and create slip hazards.",
      "## Common Problem Birds",
      "Pigeons are the most common pest bird in urban areas. They nest on ledges, in eaves, and on rooftops. Sparrows and starlings can also cause problems, especially when they nest in vents and soffits.",
      "## Health Concerns",
      "Bird droppings can harbor histoplasmosis, cryptococcosis, and other diseases. Nesting materials can block vents and create fire hazards. Mites and other parasites from bird nests can infest buildings.",
      "## Humane Removal Methods",
      "Effective bird control focuses on exclusion and deterrence. Options include: bird netting, bird spikes, electric deterrent systems, and habitat modification.",
      "## Professional Solutions",
      "Bird removal requires specialized equipment and knowledge of bird behavior. Our team can assess your situation and implement effective, humane solutions.",
    ],
  },
  "what-are-rock-pigeons": {
    title: "What Are Rock Pigeons?",
    excerpt: "Rock pigeons are one of the most common pest birds in urban areas.",
    author: "Preventive Pest LV",
    date: "February 27, 2025",
    category: "Birds",
    image: "/rock-pigeon-city-building-close-up.jpg",
    readTime: "5 min read",
    content: [
      "Rock pigeons, also known as common pigeons, are the birds you see in almost every urban environment. Originally cliff-dwellers, they've adapted perfectly to man-made structures.",
      "## Identification",
      "Rock pigeons typically have gray plumage with iridescent neck feathers, two dark wing bars, and a white rump. However, due to extensive breeding, they come in many color variations.",
      "## Why They're Problematic",
      "A single pigeon produces about 25 pounds of droppings per year. These droppings are highly acidic and can damage building materials, vehicles, and equipment. They also carry numerous diseases.",
      "## Nesting Habits",
      "Pigeons nest year-round and can raise up to 6 broods per year. They prefer flat surfaces with overhead protection - ledges, under bridges, in warehouses, and on signs.",
      "## Control Strategies",
      "Effective pigeon control combines exclusion (preventing access to roosting sites), deterrents (making areas uncomfortable), and in some cases, population reduction through trapping.",
    ],
  },
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | Preventive Pest Control Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[40vh] min-h-[400px]">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-32 mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <span className="inline-block rounded-full bg-accent px-4 py-1 text-sm font-medium text-white mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">{post.title}</h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <article className="prose prose-lg max-w-none">
              {post.content.map((block, idx) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold text-foreground mt-10 mb-4">
                      {block.replace("## ", "")}
                    </h2>
                  )
                }
                return (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-6">
                    {block}
                  </p>
                )
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Share this article:</span>
                <button className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
              <Button asChild>
                <Link href="/contact">Get Help Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Need Professional Pest Control?</h2>
          <p className="mt-4 text-xl text-white/80">Don't let pests take over your home. Get expert help today.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
              <Link href="/contact">Get $39.95 First Service</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="tel:4352566391">
                <Phone className="mr-2 h-5 w-5" />
                (435) 256-6391
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
