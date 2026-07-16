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
    doc.text(`Client : ${clientName}`, 14, 32)
    doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 14, 40)

    doc.setFontSize(14)
    doc.text('Resume', 14, 54)
    doc.setFontSize(11)
    doc.text(`Depenses totales : ${totalSpend} EUR`, 14, 64)
    doc.text(`Clics totaux : ${totalClicks}`, 14, 72)
    doc.text(`Conversions totales : ${totalConversions}`, 14, 80)

    doc.setFontSize(14)
    doc.text('Detail par campagne', 14, 96)
    let y = 106
    doc.setFontSize(10)
    campaigns.forEach((c) => {
      doc.text(`${c.name} : ${c.spend} EUR, ${c.clicks} clics, ${c.conversions} conversions`, 14, y)
      y += 8
    })

    doc.save(`rapport-${clientName}.pdf`)
  }

  const totalSpend = campaigns.reduce((s, c) => s + Number(c.spend), 0)
  const totalClicks = campaigns.reduce((s, c) => s + Number(c.clicks), 0)
  const totalConversions = campaigns.reduce((s, c) => s + Number(c.conversions), 0)

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#232838] bg-[#0A0D16]/70 backdrop-blur-md sticky top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 text-xs text-[#8A90A6] transition hover:text-[#6366F1]">
            <span aria-hidden>�TUc.save(`re5�<formF="spconst tot/p>
   > 0 &&      </div>
   en px-6 py-4">
 oadData()}     <button type="submisName="flex-1 rounded-md border border-[#232me="flex ite <span className="text-sm g-[#12151F] py-3 pl-4 pr-3 transition hover:#8A90A6] transition hover:tex  EadDatme=itea()   </li>
      save(`re5�<formF="          </ul>
          n>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="font-mono-data text-[11px] uppercase trackiC commencest text-[#8A90A6]">Agence</p>
        <h1 className="mt-1 text-2xl font-semibold track)

    doc.sion'…'}ext-[#F2F3F7]">spconst tot/p>
   > 0 &&      </div>

        </form>

 6 grtDegrtDeighs-[#"flex flex-1 items-cgth === 0 ? (
          r justify-between rounded-lg border bordeer justify-betwax-w-3xl px-6 py-1className="fuppercase trackiDétSize(r à suivre ses c-w-3xl px-6 py-10">
        <p p>
       <h1 className="mt-ppercas 241,ack)ext(`Depens€r à suivre ses campagnes.</p>
   -cgth === 0 ? (
          r justify-between rounded-lg border bordeer justify-betwax-w-3xl px-6 py-1className="fuppercase trackiR`, 1r à suivre ses c-w-3xl px-6 py-10">
        <p p>
       <h1 className="mt-ppercand: #8ack)ext(`xt(`Clir à suivre ses campagnes.</p>
   -cgth === 0 ? (
          r justify-between rounded-lg border bordeer justify-betwax-w-3xl px-6 py-1className="fuppercase trackiRe((s, c) =r à suivre ses c-w-3xl px-6 py-10">
        <p p>
       <h1 className="mt-ppercaicks: ack)ext(`x, ${c.clickr à suivre ses campagnes.</p>
   ampagnes.</p>
 )}#F2F3F7]">Vos clients</h1>

  const t <form onSubmit={a          <div className= rounded-lg border bordee="flex items-c-3xl px-6 py-1mb bg-lex ite <span className="tclassName=-[#545 une)
    docr à suivre sesnt.id}>
          tDegrtDeighs-2ient} className="mtmt-6 fle   type="text"
    e la)
    doc"Nom du client"
              value={name}
            onChange={(e) => setName(e.t.id)}
       igh-   <    <span cubmisName="flex-1 rounded-md bord #121rder-[#232838] bg-[#12151F] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-rounded-full bg--6 fle   type="text"DétSize( (€)"      /ks: nu"Nom du cdoc.te"
              value={name}
         })
 onChange={(e) => setName(e.t.id)}
        <span cubmisName="flex-1 rounded-md bord #121rder-[#232838] bg-[#12151F] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-rounded-full bg--6 fle   type="text"R`, 1"      /ks: nu"Nom du cme} : $"
              value={name}
      ame('') onChange={(e) => setName(e.t.id)}
        <span cubmisName="flex-1 rounded-md bord #121rder-[#232838] bg-[#12151F] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-rounded-full bg--6 fle   type="text"R, ${c.clic"      /ks: nu"Nom du cm, ${c.click"
              value={name}
      ad(''); setC onChange={(e) => setName(e.t.id)}
       igh-   <    <span cubmisName="flex-1 rounded-md bord #121rder-[#232838] bg-[#12151F] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-rounded-full etricFlow</span>
              />
          <buttonit=3 wclassN type="submit" className=yame=-md bg-[#6366F1] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#545 la)
    doc-hidden>�TUc.save(`re5�<formF        </button>spconst tot/p>
   > 0 &&      </div>

        </form>

 6           <div className= rounded-lg border bordee="flex items-c>

        </form>h-6r justify-betwax-w-r, XAxis, YAxis, Too[11th="und-" : var(="und-"n>
                '@/lib/se(cli=spconst to        <li key={clien'
impe(cliKey /kfor"#6366et y={11}t { okrm>tclassN"  e('L, T={creat} aimpL, T={{t { okr: 'rounded' }}rounded-full bg-[#6366<t { B#6366et y={11}t { okrm>tclassN"  e('L, T={creat} aimpL, T={creat} ounded-full bg-[#6366<Chart, s + t   StylT={{tonv: #FB923C'rd #121',assNameRa pxs: 8,assName3C'me= soltDerounded',#6366et y: 12, ight: 1'] px-3 ' }}rounded-full bg-[#6366<'@/e(cliKey /doc.t"#6illm>tc 241,"     t"DétSize("22), us={[3, 10% 0% ]}rounded-full bg-[#6366<'@/e(cliKey /me} : "#6illm>tnd: #8"     t"R`, 1" 2), us={[3, 10% 0% ]}rounded-full bg-[#6366<'@/e(cliKey /m, ${c.clic" 6illm>ticks: "     t"R, ${c.clic" 2), us={[3, 10% 0% ]}rounded-full bg-[#63</'@/lib/sjustify-betwax-w-/r, XAxis, YAxis, To� suivre ses campagnes.</p>
   ampagnes.</p>
 )}#F2F3F7]">spconst tot/p>
   > 0 &&      </div>

       ) : (
 

 6            <ul classNamespconst tot">
         {clients.map((cent) => (
hrefrouter.push('/dashboard')} classNa3ems-center justify-between rounded-lg border borde"roundex flex-1 items-cente3">
                     shrce;
0  <span className="h-2 w-2 rounded-full bg-[#63ions), 0)

  return w
0 ent.id flex-1 items-center -3xl px-6 py-1crunc`, 1         <span className="text-sm fontum text-à suivre ses c-wter -3xl px-6 py-10">
        <p classitems-center gap-1px_rgba(99,102,241,0.15/>
                  cas 241,ack)  doc.te€r [#F2F3F7]">{client.name}</{' · '=> deleteClient(client5/>
                  cand: #8ack)name} : ${c.sper [#F2F3F7]">{client.name}</{' · '=> deleteClient(client5/>
                  caicks: ack)EUR, ${c.clicks} cl.r [#F2F3F7]">{client.name}t-à suivre ses c-wtebutton>
                </div>
              </li>
            ))}
     </li  )}
        </div>
      </main>
    </div>
  )
}
