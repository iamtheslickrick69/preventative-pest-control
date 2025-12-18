import type { Metadata } from "next"
import Link from "next/link"
import { Briefcase, MapPin, Clock, DollarSign, CheckCircle, Phone, Users, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Careers at Preventive Pest Control | Join Our Team",
  description:
    "Join one of Nevada's largest privately-held pest control companies. We're hiring technicians and customer service representatives in Southern Utah and Nevada.",
}

const benefits = [
  { icon: DollarSign, title: "Competitive Pay", desc: "Industry-leading wages plus commission opportunities" },
  { icon: Heart, title: "Health Benefits", desc: "Medical, dental, and vision coverage for you and your family" },
  { icon: TrendingUp, title: "Career Growth", desc: "Advancement opportunities and ongoing training" },
  { icon: Users, title: "Great Team", desc: "Join a family-owned company that values its employees" },
]

const openPositions = [
  {
    title: "Pest Control Technician",
    location: "St. George, UT",
    type: "Full-time",
    description:
      "Service residential and commercial accounts, identify pest issues, and apply treatments. No experience required - we provide comprehensive training.",
    requirements: [
      "Valid driver's license",
      "Ability to lift 50+ lbs",
      "Strong customer service skills",
      "Willingness to learn",
    ],
  },
  {
    title: "Pest Control Technician",
    location: "Cedar City, UT",
    type: "Full-time",
    description:
      "Join our Iron County team servicing Cedar City and surrounding areas. Full training provided for the right candidate.",
    requirements: ["Valid driver's license", "Reliable transportation", "Good communication skills", "Detail-oriented"],
  },
  {
    title: "Pest Control Technician",
    location: "Mesquite, NV",
    type: "Full-time",
    description: "Service our growing Nevada territory. Experience with scorpion control a plus but not required.",
    requirements: [
      "Valid driver's license",
      "Customer-focused attitude",
      "Ability to work independently",
      "Physical fitness",
    ],
  },
  {
    title: "Customer Service Representative",
    location: "St. George, UT",
    type: "Full-time",
    description:
      "Handle inbound calls, schedule appointments, and provide exceptional service to our customers. Office-based position.",
    requirements: [
      "Excellent phone manner",
      "Computer proficiency",
      "Problem-solving skills",
      "Previous customer service experience preferred",
    ],
  },
]

export default function EmploymentPage() {
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
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-medium">We're Hiring!</span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Join Our Team</h1>

            <p className="mt-6 text-xl text-white/80">
              Build a rewarding career with one of Nevada's largest privately-held pest control companies. We're growing
              and looking for talented individuals to join our family.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Work at Preventive Pest Control?</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              We're more than a company - we're a family that's been serving our community for 25+ years.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="rounded-2xl bg-card border border-border p-6 text-center">
                <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Promise to Employees</h2>
              <p className="text-lg text-muted-foreground mb-6">
                "Preventive Pest Control is not just a name. We will do the right thing at the right time. Our
                experience and knowledge in pest control has allowed us to create a scientific process to eliminate
                infestations and control future pests."
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We invest in our team with comprehensive training, state-of-the-art equipment, and a supportive work
                environment. Many of our technicians have been with us for 10+ years.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span>Paid Training</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span>Company Vehicle</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span>Uniforms Provided</span>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                  <span>Paid Time Off</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-primary/5 p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">What Our Team Says</h3>
              <div className="space-y-6">
                <div className="rounded-xl bg-card border border-border p-4">
                  <p className="text-muted-foreground italic mb-3">
                    "I've been with Preventive for 8 years. The training was excellent, and I love that my customers
                    know me by name."
                  </p>
                  <div className="font-medium text-primary">- Tyler, Lead Technician</div>
                </div>
                <div className="rounded-xl bg-card border border-border p-4">
                  <p className="text-muted-foreground italic mb-3">
                    "Great company to work for. They really care about their employees and customers alike."
                  </p>
                  <div className="font-medium text-primary">- Miguel, Technician</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Open Positions</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Find your next opportunity with Preventive Pest Control
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {openPositions.map((job, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/contact">Apply Now</Link>
                  </Button>
                </div>

                <p className="text-muted-foreground mb-4">{job.description}</p>

                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Requirements:</div>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {job.requirements.map((req, reqIdx) => (
                      <li key={reqIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">How to Apply</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to join our team? Contact us today to learn more about available positions and start your
              application process.
            </p>

            <div className="rounded-2xl bg-card border border-border p-8">
              <div className="space-y-4 text-left mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <p className="text-muted-foreground">Call or visit us to express your interest</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <p className="text-muted-foreground">Complete our application form</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <p className="text-muted-foreground">Interview with our team</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <p className="text-muted-foreground">Start your training and career!</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Us to Apply</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="tel:4352566391">
                    <Phone className="mr-2 h-5 w-5" />
                    (435) 256-6391
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Build Your Career With Us</h2>
          <p className="mt-4 text-xl text-white/90">
            Join a team that's been protecting Southern Utah homes for 25+ years.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
              <Link href="/contact">Apply Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
