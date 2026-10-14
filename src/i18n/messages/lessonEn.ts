import type { LessonCopy } from './types'

/** /video-lessons — personal video lessons in English. Copy approved by the manager. */
export const lessonEn: LessonCopy = {
  page: {
    pageTitle: 'Personal Video Guitar Lessons | Sulomam',
    eyebrow: 'Lessons',
    title: 'Personal Video Guitar Lessons',
    tagline: 'A lesson made just for you, from your own playing.',
    intro: [
      'Send me a video of you playing. I’ll watch it carefully and make a lesson video just for you: what you’re doing well, what to fix, and how to practice it. Slow, close-up demos of both hands, with English subtitles.',
    ],
    sections: [
      {
        kind: 'trial',
        heading: 'Free Trial Lesson (first 5 people only)',
        lead: 'Not sure yet? Try it for free.',
        body: 'Send me a short video of one phrase or intro you’re working on. I’ll send back a 2–3 min personal lesson video with one key tip.',
        items: [
          'One phrase or intro only',
          'First 5 people only',
          '$10 off your first One Chorus Lesson',
        ],
        cta: 'Apply for Free Trial',
      },
      {
        kind: 'plans',
        heading: 'Plans',
        plans: [
          {
            id: 'video-chorus',
            name: 'One Chorus Lesson',
            price: '$60',
            body: 'One full chorus of the song — intro, verse and chorus — the same length as my Instagram reels.',
          },
          {
            id: 'video-phrase',
            name: 'Phrase Lesson',
            price: '$20',
            body: 'One riff, phrase, or short section (“just this part of the video”).',
          },
        ],
      },
      {
        kind: 'plans',
        heading: 'Optional',
        plans: [
          {
            id: 'extra-section',
            name: 'Extra Section',
            price: '+$20 each',
            body: 'Want the 2nd verse variations, the solo or the outro too? Add any extra section for $20 each. Just mention it when you send your video.',
          },
          {
            id: 'zoom-addon',
            name: 'Live Zoom Support (15 min)',
            price: '+$15',
            body: 'Want to see something up close in real time? Add a short live session after your lesson. Just mention it when you send your video.',
          },
        ],
      },
      {
        kind: 'text',
        heading: 'What’s in your lesson video',
        body: 'Each video includes: A comment on your playing, the key fixes, my demo (slow and normal speed), and practice tips. English subtitles and notes included.',
      },
      {
        kind: 'list',
        heading: 'Support',
        items: ['14 days of WhatsApp support: ask questions anytime, as many as you like'],
      },
      {
        kind: 'text',
        heading: 'How it works',
        body: 'Send me your video first. I’ll watch it, and if it’s a good fit, I’ll send you a payment link. Within 1–3 days of payment you’ll get your first tip, and all videos arrive within 7 days. If I can’t deliver within 7 days, you’ll get a full refund.',
      },
      {
        kind: 'list',
        heading: 'Sending your video',
        items: [
          'Phone video is fine. Just keep both hands in view',
          'In the form, tell me the song and paste a link to your video (YouTube unlisted, Google Drive, etc.)',
        ],
      },
      {
        kind: 'list',
        heading: 'Good for',
        items: [
          'Beginner to intermediate players',
          'Anyone stuck learning a song from TAB',
          'Any time zone, no live call needed',
        ],
      },
      {
        kind: 'text',
        heading: 'Recording',
        body: 'You’re welcome to record our Zoom session or save your lesson videos for your own practice. Please don’t upload or share them on social media or video sites.',
      },
      {
        kind: 'faq',
        heading: 'FAQ',
        items: [
          {
            q: 'My playing isn’t good yet. Is that OK?',
            a: 'Of course. Mistakes help me see exactly what to fix.',
          },
          { q: 'Do I need to show my face?', a: 'No. Just your hands and guitar.' },
          {
            q: 'Can you make a hard song easier?',
            a: 'Yes, I can simplify parts to match your level.',
          },
          {
            q: 'Can you teach the whole song?',
            a: 'The One Chorus Lesson covers intro, verse and chorus, which is enough to play most songs. You can add any remaining sections (2nd verse, solo, outro) for $20 each.',
          },
          {
            q: 'Can I send a new song during the 14 days?',
            a: 'Questions about your lesson are unlimited. A new song is a new lesson.',
          },
        ],
      },
    ],
    buttons: [
      { id: 'video-chorus', label: 'Apply / Send your video (One Chorus Lesson $60)', to: '/contact?plan=video-chorus' },
      { id: 'video-phrase', label: 'Apply / Send your video (Phrase Lesson $20)', to: '/contact?plan=video-phrase' },
    ],
  },
  card: {
    eyebrow: 'Lessons',
    title: 'Personal Video Guitar Lessons',
    tagline: 'A lesson made just for you, from your own playing.',
    prices: 'Free Trial・Phrase $20・One Chorus $60',
    cta: 'Learn more',
  },
  thanks: {
    pageTitle: 'Thank you for your order | Sulomam',
    title: 'Thank you for your order! 🎸',
    lead: [
      'Within 1–3 days of payment you’ll get your first tip, and all your lesson videos arrive within 7 days. If I can’t deliver within 7 days, you’ll get a full refund.',
    ],
    after: [
      'After your lesson, you can ask me questions on WhatsApp for 14 days.',
      'If you added Live Zoom Support, we’ll pick a time together on WhatsApp.',
    ],
    cta: 'Message me on WhatsApp',
  },
}
