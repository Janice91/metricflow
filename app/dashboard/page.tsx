'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Client = { id: string; name: string; created_at: string }

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => { loadClients() }, [])

  async function loadClients() {
    setLoading(true)
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) { router.push('/login'); return }
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setClients(data || [])
    setLoading(false)
  }

  async function addClient(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    const { data: sessionData } = await supabase.auth.getSession()
    const userId = sessionData.session?.user.id
    await supabase.from('clients').insert({ name, user_id: userId })
    setName('')
    loadClients()
  }

  async function deleteClient(id: string) {
    await supabase.from('clients').delete().eq('id', id)
    loadClients()
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#E4E4E0] bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#4F46E5] font-mono-data text-[10px] font-bold text-white">
              MF
            </div>
            <span className="text-sm font-semibold tracking-tight">MetricFlow</span>
          </div>
          <button onClick={signOut} className="text-xs text-[#565B6B] transition hover:text-[#DC2626]">
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="font-mono-data text-[11px] uppercase tracking-widest text-[#565B6B]">Agence</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#14171F]">Vos clients</h1>

        <form onSubmit={addClient} className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="Nom du client"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-md border border-[#E4E4E0] bg-white px-3 py-2 text-sm outline-none transition focus:border-[#4F46E5] focus:ring-2 focus:ring-[#EEF0FF]"
          />
          <button type="submit" className="rounded-md bg-[#4F46E5] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#4338CA]">
            Ajouter
          </button>
        </form>

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-[#565B6B]">Chargement…</p>
          ) : clients.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E4E4E0] bg-white px-6 py-10 text-center">
              <p className="text-sm text-[#565B6B]">Aucun client pour l&apos;instant. Ajoutez-en un pour commencer à suivre ses campagnes.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {clients.map((client) => (
                <li key={client.id}>
                  <div className="group flex items-center justify-between rounded-lg border border-[#E4E4E0] bg-white py-3 pl-4 pr-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:border-[#4F46E5]/40 hover:shadow-[0_2px_8px_rgba(79,70,229,0.08)]">
                    <a href={`/dashboard/${client.id}`} className="flex flex-1 items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                      <span className="text-sm font-medium text-[#14171F]">{client.name}</span>
                    </a>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="rounded px-2 py-1 text-xs text-[#565B6B] opacity-0 transition group-hover:opacity-100 hover:text-[#DC2626]"
                    >
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
