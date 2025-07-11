export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold">MonoLink</h1>
        <p className="text-xl mt-4">Jamstack Blog & Portfolio</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
          <ul className="space-y-2">
            <li>• Next.js (SSG/ISR, TypeScript)</li>
            <li>• Strapi (Headless CMS)</li>
            <li>• Supabase (Database, Auth, Edge Functions)</li>
            <li>• Cloudinary (Media CDN)</li>
            <li>• Vercel (Deployment)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}