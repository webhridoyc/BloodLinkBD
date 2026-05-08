import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  Globe,
  Mail,
  MapPin,
  Megaphone,
  PenTool,
  Phone,
  Play,
  Smile,
  Sparkles,
} from 'lucide-react';

const services = [
  {
    title: 'Design',
    description: 'Eye-catching visuals that communicate your brand message with impact.',
    points: ['Logo & Brand Identity', 'Social Media Design', 'Print Design', 'UI/UX Design'],
    icon: PenTool,
  },
  {
    title: 'Marketing',
    description: 'Strategic digital marketing solutions that drive traffic, engagement and conversions.',
    points: ['Social Media Marketing', 'SEO & Content Strategy', 'Paid Advertising', 'Analytics & Reporting'],
    icon: Megaphone,
  },
  {
    title: 'Branding',
    description: 'Build a strong, consistent brand identity that sets you apart from the competition.',
    points: ['Brand Strategy', 'Brand Identity', 'Visual Guidelines', 'Brand Consultation'],
    icon: Sparkles,
  },
];

const projects = [
  {
    title: 'Packaging Design',
    category: 'Branding',
    image:
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Social Media Campaign',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Brand Identity',
    category: 'Branding',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Product Design',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Website Design',
    category: 'UI/UX Design',
    image:
      'https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Social Media Ad',
    category: 'Marketing',
    image:
      'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Billboard Design',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Food Promo Design',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  },
];

const skills = [
  { name: 'Photoshop', short: 'Ps', bg: '#001E36', color: '#31A8FF' },
  { name: 'Illustrator', short: 'Ai', bg: '#330000', color: '#FF9A00' },
  { name: 'Figma', short: 'F', bg: '#F24E1E', color: '#FFFFFF' },
  { name: 'After Effects', short: 'Ae', bg: '#1F1A3B', color: '#CF9FFF' },
  { name: 'WordPress', short: 'W', bg: '#21759B', color: '#FFFFFF' },
  { name: 'SEO', short: 'SEO', bg: '#111827', color: '#FBBF24' },
  { name: 'Google Ads', short: 'G', bg: '#4285F4', color: '#FFFFFF' },
  { name: 'Meta Ads', short: 'M', bg: '#1D4ED8', color: '#FFFFFF' },
];

const stats = [
  { value: '2+', label: 'Years Experience', icon: Award },
  { value: '50+', label: 'Projects Completed', icon: Briefcase },
  { value: '30+', label: 'Happy Clients', icon: Smile },
];

const contactItems = [
  { icon: Phone, label: '+880 1712-345678' },
  { icon: Mail, label: 'hello@hridoychondro.com' },
  { icon: MapPin, label: 'Tangail, Bangladesh' },
  { icon: Globe, label: 'hridoychondro.com' },
];

export default function HomePage() {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <section id="home" className="relative overflow-hidden bg-[#0b0b0b] text-white">
        <div className="container mx-auto px-4 pt-20 pb-20 lg:pt-24 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge className="mb-5 gap-2 border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                <span className="h-2 w-2 rounded-full bg-[#f5c400]" /> Available for projects
              </Badge>
              <p className="text-lg text-white/70">Hi, I&apos;m</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
                <span className="block">Hridoy</span>
                <span className="block font-[var(--font-signature)] text-5xl text-[#f5c400] sm:text-6xl lg:text-7xl">
                  Chondro
                </span>
              </h1>
              <p className="mt-4 text-2xl font-semibold text-white/90">
                Graphic Designer <span className="text-[#f5c400]">&amp;</span> Digital Marketer
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                I help brands grow with creative design and data-driven marketing strategies that engage,
                inspire and convert.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button className="bg-[#f5c400] text-black hover:bg-[#f5c400]/90" size="lg" asChild>
                  <Link href="#portfolio">
                    View Portfolio
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="border border-white/15 text-white/80 hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="#portfolio">
                    <Play className="h-4 w-4" /> Play Showreel
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-[#f5c400]" /> Based in Tangail, Bangladesh
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -top-10 right-10 h-48 w-48 rounded-full bg-white/5" />
              <div className="absolute -right-12 top-12 h-28 w-28 rounded-full bg-white/10" />
              <div className="absolute left-0 top-20 h-24 w-24 rounded-full border border-white/10" />
              <div
                className="absolute right-12 top-12 h-32 w-32 rounded-full opacity-40"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
                  backgroundSize: '10px 10px',
                }}
              />

              <div className="relative">
                <div className="absolute -bottom-8 left-6 h-28 w-44 rounded-[32px] bg-[#f5c400] opacity-90 rotate-6" />
                <Image
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80"
                  alt="Portrait of Hridoy"
                  width={420}
                  height={520}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 280px"
                  className="relative z-10 w-[280px] rounded-[28px] object-cover grayscale sm:w-[340px] lg:w-[420px]"
                />
                <div className="absolute -bottom-6 right-0 translate-x-6 rounded-2xl border border-white/10 bg-[#1a1a1a] px-5 py-4 text-white/80 shadow-xl">
                  <p className="text-xs uppercase text-white/40">Let&apos;s work</p>
                  <p className="text-sm font-semibold text-white">together.</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="h-1 w-10 rounded-full bg-[#f5c400]" />
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5c400] text-black">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f6f6f6] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full bg-[#f5c400]/15 px-3 py-1 text-xs font-semibold uppercase text-[#b48300]">
                What I Do
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#111111]">My Services</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              I provide creative solutions that help businesses build their brand, reach the right audience and
              achieve real results.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b0b0b] text-[#f5c400]">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold text-[#111111]">{service.title}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-500">{service.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5c400]/15 text-[#f5c400]">
                        <Check className="h-3 w-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex justify-end">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-[#f5c400]/15 px-3 py-1 text-xs font-semibold uppercase text-[#b48300]">
                My Work
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#111111]">Featured Projects</h2>
            </div>
            <Button className="border border-gray-200 bg-white text-[#111111] hover:bg-gray-100" size="lg" asChild>
              <Link href="#portfolio">
                View All Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-2xl bg-black/5 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={480}
                  height={320}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-xs uppercase text-white/70">{project.category}</p>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#f6f6f6] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
              <span className="inline-flex rounded-full bg-[#f5c400]/15 px-3 py-1 text-xs font-semibold uppercase text-[#b48300]">
                About Me
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#111111]">About Me</h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                I&apos;m Hridoy, a passionate Graphic Designer and Digital Marketer based in Tangail, Bangladesh. I
                love turning ideas into visual stories and crafting strategies that help brands grow. With a
                strong focus on creativity and results, I combine design thinking with marketing strategies to
                deliver impactful digital solutions.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-[#f6f6f6] p-4 text-center">
                    <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#f5c400]/20 text-[#b48300]">
                      <stat.icon className="h-5 w-5" />
                    </span>
                    <p className="text-lg font-semibold text-[#111111]">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-6 bg-[#111111] text-white hover:bg-[#1f1f1f]" asChild>
                <a href="/hridoy-chondro-cv.pdf" download>
                  Download CV <ArrowDownToLine className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div
              id="skills"
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
            >
              <span className="inline-flex rounded-full bg-[#f5c400]/15 px-3 py-1 text-xs font-semibold uppercase text-[#b48300]">
                My Skills
              </span>
              <h2 className="mt-3 text-3xl font-bold text-[#111111]">Skills &amp; Expertise</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {skills.map((skill) => (
                  <div key={skill.name} className="rounded-2xl border border-gray-100 p-4 text-center">
                    <span
                      className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-semibold"
                      style={{ backgroundColor: skill.bg, color: skill.color }}
                    >
                      {skill.short}
                    </span>
                    <p className="text-sm font-medium text-gray-700">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0b0b0b] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex rounded-full bg-[#f5c400]/20 px-3 py-1 text-xs font-semibold uppercase text-[#f5c400]">
                Get In Touch
              </span>
              <h2 className="mt-3 text-3xl font-bold">Let&apos;s Work Together</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Have a project in mind? Let&apos;s create something amazing together.
              </p>
              <div className="mt-8 space-y-4 text-sm text-white/70">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#f5c400]">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <form
              action="mailto:hello@hridoychondro.com"
              method="post"
              encType="text/plain"
              className="rounded-3xl border border-white/10 bg-[#141414] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Your Name"
                  className="border-white/10 bg-transparent text-white placeholder:text-white/50"
                />
                <Input
                  placeholder="Your Email"
                  className="border-white/10 bg-transparent text-white placeholder:text-white/50"
                />
              </div>
              <Input
                placeholder="Subject"
                className="mt-4 border-white/10 bg-transparent text-white placeholder:text-white/50"
              />
              <Textarea
                placeholder="Your Message"
                className="mt-4 min-h-[140px] border-white/10 bg-transparent text-white placeholder:text-white/50"
              />
              <Button className="mt-6 w-full bg-[#f5c400] text-black hover:bg-[#f5c400]/90" size="lg">
                Send Message <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
