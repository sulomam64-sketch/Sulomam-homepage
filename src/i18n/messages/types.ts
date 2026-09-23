export type NavItem = { to: string; label: string }

export type ServiceItem = {
  id: string
  title: string
  description: string
}

export type PlanCard = {
  id: string
  name: string
  price: string
  blurb: string
  includes: string[]
  excludes: string[]
  turnaround: string
}

export type PlanQuote = {
  name: string
  price: string
  body: string
  inquire: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type PlansCopy = {
  eyebrow: string
  title: string
  lead: string
  inquire: string
  pay: string
  payDeposit: string
  payFull: string
  balanceNote: string
  stripeFootnote: string
  stemsOption: string
  stemsPay: string
  includesLabel: string
  excludesLabel: string
  turnaroundLabel: string
  featuredLabel: string
  tablistLabel: string
  tabs: {
    guitar: string
    track: string
    mix: string
  }
  guitar: {
    categoryName: string
    lead: string
    creditCallout: string
    noTabCallout: string
    scopeHint: string
    cards: PlanCard[]
    commercial: PlanQuote
  }
  track: {
    categoryName: string
    lead: string
    hint: string
    cards: PlanCard[]
  }
  vocalEdit: {
    heading: string
    lead: string
    card: PlanCard
  }
  fullSong: {
    heading: string
    lead: string
    name: string
    price: string
    body: string
    turnaround: string
    inquire: string
  }
  mix: {
    categoryName: string
    lead: string
    cards: PlanCard[]
  }
  notesHeading: string
  notes: string[]
  faq: {
    heading: string
    lead: string
    items: FaqItem[]
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
    closing: {
      aside: string
      consultNote: string
    }
    plans: PlansCopy
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
