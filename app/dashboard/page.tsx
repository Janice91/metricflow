'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type Client = {
  id: string
  name: string
  meta_ads_account_id: string | null
  created_at: string
}

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadClients()
  }, [])

  async function loadClients() {
    setLoading(true)
    const { data: sessionData } = await supabase.auth.getSession()
    if (!sessionData.session) {
      router.push('/login')
      return
    }
    const { data } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mes clients</h1>
          <button onClick={signOut} className="text-sm text-red-600">
            Se déconnecter
          </button>
        </div>

        <form onSubmit={addClient} className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Nom du client"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded border p-2"
          />
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">
            Ajouter
          </button>
        </form>

        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : clients.length === 0 ? (
          <p className="text-gray-500">Aucun client pour l'instant.</p>
        ) : (
          <ul className="space-y-2">
            {clients.map((client) => (
              <li
                key={client.id}
                className="flex items-center justify-between rounded border bg-white p-4"
              >
                <a href={`/dashboard/${client.id}`} className="font-medium hover:underline">
                  {client.name}
                </a>
                <button
                  onClick={() => deleteClient(client.id)}
                  className="text-sm text-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
