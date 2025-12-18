import type { Metadata } from "next"
import Link from "next/link"
import { Star, CheckCircle, Phone, ExternalLink, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Customer Reviews - 965+ 5-Star Reviews | Preventive Pest Control",
  description:
    "See what our customers are saying about Preventive Pest Control. 965+ Google reviews from satisfied homeowners across Southern Utah and Southeast Nevada.",
}

const allReviews = [
  {
    name: "Deborah Evans",
    date: "December 4, 2025",
    text: "Tyler is always so pleasant and professional. He is a very kind and patient young man. I have used Preventive Pest since I moved here in 2002 and have not had any issues with them. Their prices are very fair.",
    technician: "Tyler",
    yearsCustomer: 23,
  },
  {
    name: "Mary Kay Dougherty",
    date: "December 1, 2025",
    text: "Jason is very knowledgeable about the services he provides. He is very friendly and remembers any past issues that I have had. Definitely would recommend Preventative Pest Control due to my interactions with Jason.",
    technician: "Jason",
  },
  {
    name: "Lisa Farrington",
    date: "November 3, 2025",
    text: "Ronnie is, without a doubt, the best pest control guy I've ever had the pleasure of working with. His attention to detail, expertise, and friendly demeanor make him stand out from the rest. If anyone needs top-notch pest control services. I highly recommend.",
    technician: "Ronnie",
  },
  {
    name: "Apryl Massagli",
    date: "October 31, 2025",
    text: "Ronnie at Preventative Pest was awesome! He came by to help us out by spraying for scorpions around our hot tub area. He was professional and knowledgeable. He was also personable. Thanks for helping us out! We truly appreciate you.",
    technician: "Ronnie",
  },
  {
    name: "Jared Flanagan",
    date: "October 22, 2025",
    text: "Wes is always friendly, gets to work and has good suggestions. He's also accommodating since I kinda threw him off schedule and he was very decent about it. Very nice guy and efficient in his work. Knowledgeable.",
    technician: "Wes",
  },
  {
    name: "Mary Winslow",
    date: "October 21, 2025",
    text: "Miguel is always courteous and professional. He lets us know when he's about 5 minutes away and lets us know when he gets here. He takes time to do a great job, and always lets us know when he's done.",
    technician: "Miguel",
  },
  {
    name: "Andrea Sachs",
    date: "October 16, 2025",
    text: "Im really bad at leaving reviews but I have been extremely happy with this service. I have an allergic reaction to everything, especially bug and mosquito bites. Preventive pest control has been my savior. They are extremely great at complying to your schedule, coming on a timely manner, nice quality service, and low costs. Thank you for the exceptional service. Wes was my technician, thank you for taking the time to handle my mosquito problem and always having a smile on your face!",
    technician: "Wes",
  },
  {
    name: "Carey R.",
    date: "October 14, 2025",
    text: "I have used Preventative Pest Control for many years. They do a great job. Ronnie is always friendly and professional. I highly recommend him!",
    technician: "Ronnie",
  },
  {
    name: "Leanne Mieszala",
    date: "October 3, 2025",
    text: "I can't say enough great things about my Preventive Pest Control technician Chris! He always does an excellent job spraying the perimeter of my home, making sure everything is covered thoroughly. On top of that, he is extremely friendly and professional every single visit. What I appreciate most is the way he takes the time to answer my questions and put my mind at ease — which means a lot, because I have a real phobia when it comes to bugs. Thanks to his care and consistency, I feel comfortable and confident in my own home again. Highly recommend!",
    technician: "Chris",
  },
  {
    name: "Noly Zambianco",
    date: "September 26, 2025",
    text: "I had a great experience with Miguel during my recent pest control service. He was professional, knowledgeable, kind, and incredibly helpful throughout the entire visit. He took the time to explain everything clearly and made sure all my concerns were addressed. It's rare to come across someone so dedicated to their work and customer service. Highly recommend!",
    technician: "Miguel",
  },
  {
    name: "Maria Rodriguez",
    date: "September 24, 2025",
    text: "So far I am very pleased with Preventive pest control! Miguel is very detailed and communicative about any issues he sees that I should be aware of. Miguel is diligent about letting me know that he is heading to my house which I really appreciate too! The rat issue I had is gone! No bugs inside my house either! I definitely recommend this company to friends and family!",
    technician: "Miguel",
  },
  {
    name: "Tyler Podvoll",
    date: "September 8, 2025",
    text: "Robert has been servicing my house and he is great. He answers questions if we have them and he communicates very well. I haven't seen a single living thing since using Preventive Pest Control!",
    technician: "Robert",
  },
  {
    name: "hannah saiz",
    date: "August 6, 2025",
    text: "We love Preventive. We've had them service 3 of our houses now. Our third house we tried to manage bugs by ourselves with spray from Home Depot and it just wasn't working. We really didn't want to sign up with a contract so we tried someone who didn't require one, but they were very unprofessional and didn't even get rid of half the bugs. Ultimately we ended up going back to this company because they're very professional and they get rid of all the bugs. If you still see bugs, they'll even come back out. They have great availability and will still service the outside of your house if you're not home. We didn't realize how much we needed their service until we didn't have it anymore!",
    technician: "Team",
    yearsCustomer: 5,
  },
  {
    name: "Tasha Nealy",
    date: "May 8, 2025",
    text: "We have been using Preventive Pest for 10+ years. They always let us know ahead of time when they're coming, and also when they're on their way. In the entire time we've been using their services, we've only ever had them spray inside our home once. That's how well the spray works outside. We never have any pest problems. They come out every two months, but will come out again within that time frame if you need them to. Within the last two years, we also started utilizing their weed control service. It's been very nice not having to pull weeds in the yard. The services are very reasonably priced and every single person that has serviced our home has had top tier customer service. I highly recommend Preventive Pest Control for your pest and weed control needs.",
    technician: "Team",
    yearsCustomer: 10,
  },
]

const technicians = [
  { name: "Tyler", reviews: 45 },
  { name: "Ronnie", reviews: 62 },
  { name: "Jason", reviews: 38 },
  { name: "Miguel", reviews: 54 },
  { name: "Wes", reviews: 41 },
  { name: "Chris", reviews: 37 },
  { name: "Donald", reviews: 29 },
  { name: "Adam", reviews: 33 },
  { name: "Madison", reviews: 26 },
  { name: "Jorge", reviews: 31 },
  { name: "Robert", reviews: 28 },
  { name: "Blake", reviews: 24 },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
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
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">965+ Verified Google Reviews</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              What Our Customers Say
            </h1>

            <p className="mt-6 text-xl text-white/80">
              Don't just take our word for it. See why Southern Utah and Nevada families have trusted us for 25+ years.
            </p>

            {/* Rating Summary */}
            <div className="mt-10 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-8 w-8 fill-accent text-accent" />
                  ))}
                </div>
                <div className="mt-2 text-3xl font-bold text-white">4.9</div>
                <div className="text-sm text-white/60">Average Rating</div>
              </div>

              <div className="h-16 w-px bg-white/20" />

              <div className="text-center">
                <div className="text-3xl font-bold text-white">965+</div>
                <div className="text-sm text-white/60">Total Reviews</div>
              </div>

              <div className="h-16 w-px bg-white/20" />

              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm text-white/60">Years Trusted</div>
              </div>
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white">
                <Link href="https://www.google.com/search?q=preventive+pest+control+st+george+reviews" target="_blank">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View All on Google
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Review */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="relative rounded-3xl bg-card p-8 md:p-12 shadow-lg border border-primary/10">
              <Quote className="absolute top-8 left-8 h-16 w-16 text-primary/10" />

              <div className="relative">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
                  "We have been using Preventive Pest for 10+ years. In the entire time we've been using their services,
                  we've only ever had them spray inside our home once. That's how well the spray works outside. We never
                  have any pest problems."
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">TN</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-foreground">Tasha Nealy</div>
                    <div className="text-muted-foreground">10+ Year Customer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technicians */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Meet Our Technicians</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Our customers know their technicians by name. That's the Preventive difference.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technicians.map((tech) => (
              <div
                key={tech.name}
                className="rounded-xl bg-card border border-border p-4 text-center hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-primary">{tech.name.charAt(0)}</span>
                </div>
                <div className="font-semibold text-foreground">{tech.name}</div>
                <div className="text-sm text-muted-foreground">{tech.reviews}+ reviews</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Reviews Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Recent Reviews</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Real feedback from real customers across Southern Utah and Nevada
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allReviews.map((review, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-card border border-border p-6 hover:border-primary/20 hover:shadow-md transition-all"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground leading-relaxed line-clamp-5 mb-4">"{review.text}"</p>

                {/* Attribution */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="font-semibold text-foreground">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Tech</div>
                    <div className="font-medium text-primary">{review.technician}</div>
                  </div>
                </div>

                {/* Long-term customer badge */}
                {review.yearsCustomer && (
                  <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    {review.yearsCustomer}+ Year Customer
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="https://www.google.com/search?q=preventive+pest+control+st+george+reviews" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                See All 965+ Reviews on Google
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Review Themes */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">What Customers Love</h2>
            <p className="mt-3 text-lg text-muted-foreground">Common themes from hundreds of 5-star reviews</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Professional Technicians",
                desc: "Customers mention technicians by name and praise their expertise",
              },
              { title: "Consistent Communication", desc: "Texts and calls before arrival, always on time" },
              { title: "Thorough Service", desc: "Attention to detail and comprehensive treatment" },
              { title: "Long-Term Results", desc: "Many 10+ year customers with zero pest problems" },
              { title: "Fair Pricing", desc: "Consistently mentioned as affordable and worth it" },
              { title: "Quick Response", desc: "Free re-service between visits if needed" },
              { title: "Friendly Service", desc: "Technicians who answer questions and ease concerns" },
              { title: "Reliable Company", desc: "25+ years of trusted local service" },
            ].map((theme, idx) => (
              <div key={idx} className="rounded-xl bg-card border border-border p-6">
                <CheckCircle className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{theme.title}</h3>
                <p className="text-sm text-muted-foreground">{theme.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to Join 965+ Happy Customers?</h2>
          <p className="mt-4 text-xl text-white/90">
            Get your first service for just $39.95 and see why we're Southern Utah's most trusted pest control.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-accent hover:bg-white/90">
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
      <Footer />
    </div>
  )
}
