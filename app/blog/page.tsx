import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Bug, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pest Control Blog - Expert Tips & Guides | Preventive Pest Control",
  description:
    "Expert tips, industry insights, and practical guides to help keep your home or business pest-free. Prevention strategies, treatment methods, and pest identification.",
}

const blogPosts = [
  {
    slug: "how-to-remove-cockroaches-apartment",
    title: "How To Remove Cockroaches in an Apartment: A Step-by-Step Guide",
    excerpt:
      "Dealing with cockroaches in your apartment? Learn the most effective methods to eliminate these resilient pests and prevent them from returning. Our comprehensive guide covers identification, treatment, and prevention.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Cockroaches",
    image: "/cockroach-pest-control-apartment-kitchen.jpg",
    readTime: "8 min read",
  },
  {
    slug: "what-are-harvester-ants",
    title: "What are Harvester Ants?",
    excerpt:
      "Harvester ants are common in Southern Utah and can deliver painful stings. Learn how to identify these desert dwellers, understand their behavior, and protect your property from infestations.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Ants",
    image: "/harvester-ants-desert-utah-red-sand.jpg",
    readTime: "5 min read",
  },
  {
    slug: "scorpions-in-utah-guide",
    title: "Scorpions in Utah: A Comprehensive Guide for Locals",
    excerpt:
      "Everything you need to know about Utah scorpions - from identification to prevention. Learn which species are dangerous, where they hide, and how to keep your family safe.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Scorpions",
    image: "/scorpion-utah-desert-bark-scorpion.jpg",
    readTime: "10 min read",
  },
  {
    slug: "common-utah-spiders",
    title: "Watch Out for These 10 Common Utah Spiders",
    excerpt:
      "From harmless house spiders to the dangerous Black Widow, learn to identify the 10 most common spiders in Utah. Includes photos, habitat info, and when to call a professional.",
    author: "Blake Hardy",
    date: "May 8, 2025",
    category: "Spiders",
    image: "/black-widow-spider-web-utah.jpg",
    readTime: "12 min read",
  },
  {
    slug: "nevada-scorpions-field-guide",
    title: "Nevada Scorpions: A Comprehensive Field Guide",
    excerpt:
      "A complete field guide to scorpions in Nevada. Learn about the different species found in the Mesquite and Las Vegas areas, their behaviors, and effective control methods.",
    author: "Preventive Pest LV",
    date: "March 27, 2025",
    category: "Scorpions",
    image: "/nevada-desert-scorpion-rocks.jpg",
    readTime: "9 min read",
  },
  {
    slug: "bird-removal-101",
    title: "Bird Removal 101: From Pigeons to Sparrows",
    excerpt:
      "Birds can cause significant property damage and health concerns. Learn effective, humane bird removal strategies for pigeons, sparrows, and other nuisance birds in Southern Utah.",
    author: "Preventive Pest LV",
    date: "March 27, 2025",
    category: "Birds",
    image: "/pigeons-roof-building-pest.jpg",
    readTime: "7 min read",
  },
  {
    slug: "what-are-rock-pigeons",
    title: "What Are Rock Pigeons?",
    excerpt:
      "Rock pigeons are one of the most common pest birds in urban areas. Understand their behavior, the problems they cause, and how to humanely deter them from your property.",
    author: "Preventive Pest LV",
    date: "February 27, 2025",
    category: "Birds",
    image: "/rock-pigeon-city-building.jpg",
    readTime: "5 min read",
  },
]

const categories = [
  { name: "All Posts", count: 7 },
  { name: "Scorpions", count: 2 },
  { name: "Spiders", count: 1 },
  { name: "Ants", count: 1 },
  { name: "Cockroaches", count: 1 },
  { name: "Birds", count: 2 },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Expert Pest Control Insights</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Pest Control Blog</h1>

            <p className="mt-6 text-xl text-white/80">
              Expert tips, industry insights, and practical guides to help keep your home or business pest-free.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  idx === 0
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-foreground hover:border-primary/30"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Featured Article</h2>
          </div>

          <Link href={`/blog/${blogPosts[2].slug}`} className="group block">
            <div className="grid gap-8 lg:grid-cols-2 items-center rounded-3xl bg-card border border-border p-4 hover:border-primary/30 hover:shadow-lg transition-all">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={blogPosts[2].image || "/placeholder.svg"}
                  alt={blogPosts[2].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-white">
                    {blogPosts[2].category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {blogPosts[2].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {blogPosts[2].author}
                  </span>
                  <span>{blogPosts[2].readTime}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[2].title}
                </h3>

                <p className="text-lg text-muted-foreground mb-6">{blogPosts[2].excerpt}</p>

                <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Read Full Article
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">All Articles</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, idx) => (
              <Link key={idx} href={`/blog/${post.slug}`} className="group">
                <article className="h-full rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{post.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Bug className="mx-auto h-12 w-12 text-primary mb-6" />
            <h2 className="text-3xl font-bold text-foreground">Stay Pest-Free</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get seasonal pest control tips and exclusive offers delivered to your inbox.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Schedule Service</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Have a Pest Problem Right Now?</h2>
          <p className="mt-4 text-xl text-white/90">
            Don't wait - get professional help today with our $39.95 first service offer.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link href="/contact">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
