export type NavItem = { to: string; label: string }

export type ServiceItem = {
  id: string
  title: string
  description: string
}

export type GnaTerm = {
  id: string
  term: string
  body: string
}

export type Messages = {
  site: {
    brand: string
    tagline: string
    headline: string
    description: string
    nav: NavItem[]
    languageLabel: string
    themeLabel: string
    themeLight: string
    themeDark: string
  }
  layout: {
    navAria: string
    instagram: string
  }
  home: {
    consultCta: string
    worksCta: string
    servicesHeading: string
    intro: {
      eyebrow: string
      title: string
      paragraphs: string[]
    }
    services: ServiceItem[]
    consult: {
      eyebrow: string
      title: string
      lead: string
      points: string[]
    }
    closing: {
      title: string
      body: string
      aside: string
      cta: string
    }
  }
  work: {
    eyebrow: string
    title: string
    lead: string
    production: string
    guitar: string
    subtitles: Record<string, string>
    descriptions: Record<string, string>
  }
  contact: {
    eyebrow: string
    title: string
    lead: string
    name: string
    email: string
    message: string
    note: string
    submit: string
    mailSubject: string
    mailUntitled: string
    mailName: string
    mailEmail: string
  }
  gna: {
    eyebrow: string
    title: string
    lead: string
    postsHeading: string
    postsNote: string
    openOnNote: string
    pendingNote: string
    emptyPosts: string
    termsHeading: string
    termsLead: string
    terms: GnaTerm[]
  }
}
