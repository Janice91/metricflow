'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import jsPDF from 'jspdf'

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
  const [clientName, setClientName] = useState('')
  const [name, setName] = useState('')
  const [spend, setSpend] = useState('')
  const [clicks, setClicks] = useState('')
  const [conversions, setConversions] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => { loadData() }, [id])

  async function loadData() {
    const { data: client } = await supabase.from('clients').select('name').eq('id', id).single()
    if (client) setClientName(client.name)
    const { data } = await supabase.from('campaigns').select('*').eq('client_id', id).order('created_at', { ascending: false })
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
    setName(''); setSpend(''); setClicks(''); setConversions('')
    loadData()
  }

  function exportPDF() {
    const doc = new jsPDF()
    const totalSpend = campaigns.reduce((sum, c) => sum + Number(c.spend), 0)
    const totalClicks = campaigns.reduce((sum, c) => sum + Number(c.clicks), 0)
    const totalConversions = campaigns.reduce((sum, c) => sum + Number(c.conversions), 0)

    doc.setFontSize(18)
    doc.text('MetricFlow - Rapport de performance', 14, 20)
    doc.setFontSize(12)
    doc.text('Client : ' + clientName, 14, 32)
    doc.text('Date : ' + new Date().toLocaleDateString('fr-FR'), 14, 40)

    doc.setFontSize(14)
    doc.text('Resume', 14, 54)
    doc.setFontSize(11)
    doc.text('Depenses totales : ' + totalSpend + ' EUR', 14, 64)
    doc.text('Clics totaux : ' + totalClicks, 14, 72)
    doc.text('Conversions totales : ' + totalConversions, 14, 80)

    doc.setFontSize(14)
    doc.text('Detail par campagne', 14, 96)
    let y = 106
    doc.setFontSize(10)
    campaigns.forEach((c) => {
      doc.text(c.name + ' : ' + c.spend + ' EUR, ' + c.clicks + ' clics, ' + c.conversions + ' conversions', 14, y)
      y += 8
    })

    doc.save('rapport-' + clientName + '.pdf')
  }

  const totalSpend = campaigns.reduce((s, c) => s + Number(c.spend), 0)
  const totalClicks = campaigns.reduce((s, c) => s + Number(c.clicks), 0)
  const totalConversions = campaigns.reduce((s, c) => s + Number(c.conversions), 0)

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#232838] bg-[#0A0D16]/70 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 text-xs text-[#8A90A6] transition hover:text-[#6366F1]">
            <span aria-hidden>&larr;</span> Clients
          </button>
          {campaigns.length > 0 && (
            <button onClick={exportPDF} className="rounded-md border border-[#232838] bg-[#12151F] px-3 py-1.5 text-xs font-medium text-[#F2F3F7] transition hover:border-[#6366F1]/50 hover:text-[#6366F1]">
              Exporter en PDF
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="font-mono-data text-[11px] uppercase tracking-widest text-[#8A90A6]">Campagnes</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#F2F3F7]">{clientName || '...'}</h1>

        {campaigns.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-[#232838] bg-[#12151F] p-4">
              <p className="text-[11px] text-[#8A90A6]">Depenses</p>
              <p className="font-mono-data mt-1 text-xl font-semibold text-[#818CF8]">{totalSpend}&euro;</p>
            </div>
            <div className="rounded-lg border border-[#232838] bg-[#12151F] p-4">
              <p className="text-[11px] text-[#8A90A6]">Clics</p>
              <p className="font-mono-data mt-1 text-xl font-semibold text-[#34D399]">{totalClicks}</p>
            </div>
            <div className="rounded-lg border border-[#232838] bg-[#12151F] p-4">
              <p className="text-[11px] text-[#8A90A6]">Conversions</p>
              <p className="font-mono-data mt-1 text-xl font-semibold text-[#FB923C]">{totalConversions}</p>
            </div>
          </div>
        )}

        <form onSubmit={addCampaign} className="mt-6 rounded-xl border border-[#232838] bg-[#12151F] p-5">
          <p className="mb-3 text-xs font-medium text-[#8A90A6]">Ajouter une campagne</p>
          <div className="grid grid-cols-2 gap-2">
            <input placeholder="Nom de la campagne" value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-2 rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20" />
            <input placeholder="Depenses (EUR)" type="number" value={spend}
              onChange={(e) => setSpend(e.target.value)}
              className="rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20" />
            <input placeholder="Clics" type="number" value={clicks}
              onChange={(e) => setClicks(e.target.value)}
              className="rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20" />
            <input placeholder="Conversions" type="number" value={conversions}
              onChange={(e) => setConversions(e.target.value)}
              className="col-span-2 rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20" />
          </div>
          <button type="submit" className="mt-3 w-full rounded-md bg-[#6366F1] py-2.5 text-sm font-medium text-white transition hover:bg-[#5457E5]">
            Ajouter la campagne
          </button>
        </form>

        {campaigns.length > 0 && (
          <div className="mt-6 rounded-xl border border-[#232838] bg-[#12151F] p-5">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaigns}>
                  <XAxis dataKey="name" fontSize={11} stroke="#8A90A6" tickLine={false} axisLine={{ stroke: '#232838' }} />
                  <YAxis fontSize={11} stroke="#8A90A6" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: '#171B28', borderRadius: 8, border: '1px solid #232838', fontSize: 12, color: '#F2F3F7' }} />
                  <Bar dataKey="spend" fill="#818CF8" name="Depenses" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="clicks" fill="#34D399" name="Clics" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="conversions" fill="#FB923C" name="Conversions" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {campaigns.length > 0 && (
          <ul className="mt-6 space-y-2">
            {campaigns.map((c) => (
              <li key={c.id} className="flex items-center gap-3 rounded-lg border border-[#232838] bg-[#12151F] px-4 py-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#6366F1]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#F2F3F7]">{c.name}</p>
                  <p className="font-mono-data text-xs text-[#8A90A6]">
                    <span className="text-[#818CF8]">{c.spend}&euro;</span>
                    {' - '}
                    <span className="text-[#34D399]">{c.clicks} clics</span>
                    {' - '}
                    <span className="text-[#FB923C]">{c.conversions} conv.</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
