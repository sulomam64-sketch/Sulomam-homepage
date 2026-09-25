import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { GnaPage } from './pages/GnaPage'
import { GuitarPage } from './pages/GuitarPage'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'

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
        {/* Preview hangout. Intentionally outside the studio header nav. */}
        <Route path="/guitar" element={<GuitarPage />} />
        <Route element={<StudioShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/gna" element={<GnaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={null} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
