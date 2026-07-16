'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Campaign = {
  id: string
  name: string
  spend: number
  clicks: number
  conversions: number
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [name, setName] = useState('')
  const [spend, setSpend] = useState('')
  const [clicks, setClicks] = useState('')
  const [conversions, setConversions] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    loadCampaigns()
  }, [id])

  async function loadCampaigns() {
    const { data } = await supabase
      .from('campaigns')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false })
    setCampaigns(data || [])
  }

  async function addCampaign(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    await supabase.from('campaigns').insert({
      client_id: id,
      name,
      spend: Number(spend) || 0,
      clicks: Number(clicks) || 0,
      conversions: Number(conversions) || 0,
    })
    setName('')
    setSpend('')
    setClicks('')
    setConversions('')
    loadCampaigns()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => router.push('/dashboard')} className="mb-4 text-sm text-blue-600">
          ← Retour aux clients
        </button>
        <h1 className="mb-6 text-2xl font-bold">Campagnes</h1>

        <form onSubmit={addCampaign} className="mb-6 grid grid-cols-2 gap-2 rounded border bg-white p-4">
          <input placeholder="Nom de la campagne" value={name}
            onChange={(e) => setName(e.target.value)} className="col-span-2 rounded border p-2" />
          <input placeholder="Dépenses (€)" type="number" value={spend}
            onChange={(e) => setSpend(e.target.value)} className="rounded border p-2" />
          <input placeholder="Clics" type="number" value={clicks}
            onChange={(e) => setClicks(e.target.value)} className="rounded border p-2" />
          <input placeholder="Conversions" type="number" value={conversions}
            onChange={(e) => setConversions(e.target.value)} className="rounded border p-2" />
          <button type="submit" className="col-span-2 rounded bg-blue-600 p-2 text-white">
            Ajouter la campagne
          </button>
        </form>

        {campaigns.length > 0 && (
          <div className="mb-6 h-64 rounded border bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={campaigns}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="spend" fill="#3b5bdb" name="Dépenses" />
                <Bar dataKey="clicks" fill="#2f9e44" name="Clics" />
                <Bar dataKey="conversions" fill="#e8590c" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <ul className="space-y-2">
          {campaigns.map((c) => (
            <li key={c.id} className="rounded border bg-white p-4">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-500">
                {c.spend}€ · {c.clicks} clics · {c.conversions} conversions
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
