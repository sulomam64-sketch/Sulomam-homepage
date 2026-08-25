import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContactPage } from './pages/ContactPage'
import { GnaPage } from './pages/GnaPage'
import { GnaPostPage } from './pages/GnaPostPage'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/gna" element={<GnaPage />} />
          <Route path="/gna/:slug" element={<GnaPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
