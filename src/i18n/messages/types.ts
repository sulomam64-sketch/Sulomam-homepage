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

export type GuitarRoomCopy = {
  pageTitle: string
  brandTag: string
  title: string
  tagline: string
  intro: string
  arrangementsEyebrow: string
  arrangementsTitle: string
  arrangementsLead: string
  /** Shown in place of arrangement cards while `visibleGuitarVideos` is empty. */
  arrangementsSoon: string
  /** `Up next: {title} ({artist}) solo arrangement` */
  upNext: string
  notes: Record<string, string>
  /** Shown on a lesson card that has no YouTube id yet. */
  lessonSoon: string
  /** `Watch on {platform}` */
  watchOn: string
  watchReel: string
  watch: string
  scalesEyebrow: string
  scalesTitle: string
  scalesLead: string
  comingSoon: string
  comingSoonBody: string
  gnaEyebrow: string
  gnaTitle: string
  gnaLead: string
  postsNote: string
  /** `Full list on {tips}.` */
  tipsLine: string
  webAppLine: string
  webAppLink: string
  substackLine: string
  substackLink: string
  appStore: string
  googlePlay: string
  appPending: string
  lingerEyebrow: string
  lingerTitle: string
  lingerLead: string
  puzzleTitle: string
  puzzleLead: string
  quizTitle: string
  quizLead: string
  requestEyebrow: string
  requestTitle: string
  requestLead: string
  /** Optional single choice. Submitted as the field `hear`. */
  hearLabel: string
  hearChoices: string[]
  thanks: string
  /** `… message {handle}.` */
  formError: string
  honeypot: string
  song: string
  artist: string
  handle: string
  message: string
  sending: string
  submit: string
  /** `… The {solo} is back in the studio.` */
  commission: string
  soloPlan: string
  instagram: string
  tiktok: string
  backToStudio: string
  lessonLine: string
  lessonLink: string
}

export type LessonPlan = {
  /** Key in `lessonPayLinks`. */
  id: string
  name: string
  price: string
  body: string
  /** Shown as a small pay link on the card (used for add-ons). */
  payLabel?: string
}

/**
 * With `to`, the button is an in-site link (video lessons go to the contact form first).
 * Without it, `id` is a key in `lessonPayLinks`.
 */
export type LessonButton = { id: string; label: string; to?: string }

export type LessonSection =
  /** Cards that jump to a `part` further down the page. */
  | {
      kind: 'entrances'
      items: { anchor: string; title: string; price: string; body: string; cta: string }[]
    }
  /** Large anchored heading that starts a part of the page. */
  | { kind: 'part'; anchor: string; eyebrow: string; title: string; lead?: string }
  /** Buttons placed inside the page. */
  | { kind: 'buttons'; items: LessonButton[] }
  | { kind: 'list'; heading: string; lead?: string; items: string[] }
  | { kind: 'text'; heading: string; body: string }
  | { kind: 'plans'; heading: string; plans: LessonPlan[] }
  | { kind: 'steps'; heading: string; items: string[]; after?: string }
  /** Collapsible bullet list. */
  | { kind: 'rules'; heading: string; items: string[] }
  /** Collapsible questions. */
  | { kind: 'faq'; heading: string; items: { q: string; a: string }[] }
  /** `to` defaults to the English free-trial form. */
  | { kind: 'trial'; heading: string; lead: string; body: string; items: string[]; cta: string; to?: string }

export type LessonPageCopy = {
  pageTitle: string
  eyebrow: string
  title: string
  tagline: string
  intro: string[]
  sections: LessonSection[]
  /** Buttons at the bottom. */
  buttons: LessonButton[]
}

export type LessonCardCopy = {
  eyebrow: string
  title: string
  tagline: string
  prices: string
  cta: string
}

export type LessonThanksCopy = {
  pageTitle: string
  title: string
  lead: string[]
  items?: string[]
  after?: string[]
  cta: string
  /** Second block for another lesson type, with its own button. */
  extra?: { heading: string; body: string; cta: string }
}

export type LessonCopy = {
  page: LessonPageCopy
  card: LessonCardCopy
  thanks: LessonThanksCopy
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
  guitar: GuitarRoomCopy
}
