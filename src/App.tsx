import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { GnaPage } from './pages/GnaPage'
import { GuitarPage } from './pages/GuitarPage'
import { HomePage } from './pages/HomePage'
import { LessonPage } from './pages/LessonPage'
import { LessonThanksPage } from './pages/LessonThanksPage'
import { WorkPage } from './pages/WorkPage'
import { lessonPaths } from './content/lesson'
import { lessonEn } from './i18n/messages/lessonEn'
import { lessonJa } from './i18n/messages/lessonJa'

function StudioShell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StudioShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/guitar" element={<GuitarPage />} />
          <Route path={lessonPaths.ja} element={<LessonPage copy={lessonJa.page} lang="ja" />} />
          <Route
            path={lessonPaths.jaThanks}
            element={<LessonThanksPage copy={lessonJa.thanks} lang="ja" />}
          />
          <Route path={lessonPaths.en} element={<LessonPage copy={lessonEn.page} lang="en" />} />
          <Route
            path={lessonPaths.enThanks}
            element={<LessonThanksPage copy={lessonEn.thanks} lang="en" />}
          />
          <Route path="/gna" element={<GnaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
