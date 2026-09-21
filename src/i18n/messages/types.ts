export type NavItem = { to: string; label: string }

export type ServiceItem = {
  id: string
  title: string
  description: string
}

export type GuitarPlanCard = {
  id: string
  name: string
  price: string
  blurb: string
  includes: string[]
  excludes: string[]
  turnaround: string
}

export type GuitarPlansCopy = {
  eyebrow: string
  title: string
  lead: string
  categoryName: string
  inquire: string
  includesLabel: string
  excludesLabel: string
  turnaroundLabel: string
  featuredLabel: string
  creditCallout: string
  noTabCallout: string
  termsHeading: string
  terms: string[]
  cards: GuitarPlanCard[]
  commercial: {
    name: string
    price: string
    body: string
    inquire: string
  }
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
    plansCta: string
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
    plans: GuitarPlansCopy
    listen: {
      eyebrow: string
      title: string
      lead: string
      cta: string
      play: string
      pause: string
      previous: string
      next: string
      seek: string
      volume: string
      mute: string
      unmute: string
      trackList: string
      hideTrackList: string
      showTrackList: string
      nowPlaying: string
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
    selectedPlan: string
    planPrefill: string
  }
  gna: {
    eyebrow: string
    title: string
    lead: string
    postsHeading: string
    postsNote: string
    openOnNote: string
    openOnSubstack: string
    pendingNote: string
    pendingSubstack: string
    emptyPosts: string
    termsHeading: string
    termsLead: string
    terms: GnaTerm[]
  }
}
