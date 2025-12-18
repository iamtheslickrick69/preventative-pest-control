import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://preventivepestcontrol.com'

  // Main pages
  const routes = [
    '',
    '/services',
    '/contact',
    '/reviews',
    '/blog',
    '/employment',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service pages
  const services = [
    'ant-control',
    'cockroach-control',
    'mosquito-control',
    'spider-control',
    'scorpion-control',
    'termite-control',
    'rodent-control',
    'bed-bug-control',
    'earwig-control',
    'commercial',
  ].map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Service area pages
  const areas = [
    'washington-county',
    'iron-county',
    'clark-county',
  ].map((area) => ({
    url: `${baseUrl}/service-areas/${area}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogPosts = [
    'how-to-remove-cockroaches-apartment',
    'what-are-harvester-ants',
    'scorpions-in-utah-comprehensive-guide',
    'utah-spiders-guide',
    'nevada-scorpions-field-guide',
    'bird-removal-guide',
    'what-are-rock-pigeons',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...routes, ...services, ...areas, ...blogPosts]
}
