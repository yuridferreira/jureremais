import { Header } from '@/components/layout/header/Header'
import { Footer } from '@/components/layout/footer/Footer'
import { organizationSchema, webSiteSchema } from '@/lib/seo/jsonld'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* JSON-LD global */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema()) }}
      />

      <Header transparent />

      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>

      <Footer />
    </>
  )
}
