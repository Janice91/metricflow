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
      <header className="border-b border-[#232838] bg-[#0A0D16]/70 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#6366F1] font-mono-data text-[10px] font-bold text-white">
              MF
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#F2F3F7]">MetricFlow</span>
          </div>
          <button onClick={signOut} className="text-xs text-[#8A90A6] transition hover:text-red-400">
            Se déconnecter
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="font-mono-data text-[11px] uppercase tracking-widest text-[#8A90A6]">Agence</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#F2F3F7]">Vos clients</h1>

        <form onSubmit={addClient} className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="Nom du client"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-md border border-[#232838] bg-[#12151F] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20"
          />
          <button type="submit" className="rounded-md bg-[#6366F1] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#5457E5]">
            Ajouter
          </button>
        </form>

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-[#8A90A6]">Chargement…</p>
          ) : clients.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#232838] bg-[#12151F] px-6 py-10 text-center">
              <p className="text-sm text-[#8A90A6]">Aucun client pour l&apos;instant. Ajoutez-en un pour commencer à suivre ses campagnes.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {clients.map((client) => (
                <li key={client.id}>
                  <div className="group flex items-center justify-between rounded-lg border border-[#232838] bg-[#12151F] py-3 pl-4 pr-3 transition hover:border-[#6366F1]/50 hover:shadow-[0_0_0_1px_rgba(99,102,241,0.15)]">
                    <a href={`/dashboard/${client.id}`} className="flex flex-1 items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#6366F1]" />
                      <span className="text-sm font-medium text-[#F2F3F7]">{client.name}</span>
                    </a>
                    <button
                      onClick={() => deleteClient(client.id)}
                      className="rounded px-2 py-1 text-xs text-[#8A90A6] opacity-0 transition group-hover:opacity-100 hover:text-red-400"
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
