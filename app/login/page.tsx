'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4F46E5] font-mono-data text-sm font-bold text-white">
            MF
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight text-[#14171F]">MetricFlow</h1>
            <p className="mt-1 font-mono-data text-[11px] uppercase tracking-widest text-[#565B6B]">
              Suivi de performance publicitaire
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#E4E4E0] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        >
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#565B6B]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#E4E4E0] bg-[#F7F7F5] px-3 py-2 text-sm outline-none transition focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-[#EEF0FF]"
                placeholder="vous@agence.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#565B6B]">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#E4E4E0] bg-[#F7F7F5] px-3 py-2 text-sm outline-none transition focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-[#EEF0FF]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 rounded-md bg-[#FEF2F2] px-3 py-2 text-xs text-[#DC2626]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-md bg-[#4F46E5] py-2.5 text-sm font-medium text-white transition hover:bg-[#4338CA] disabled:opacity-60"
          >
            {loading ? 'Chargement…' : isSignUp ? "Créer mon compte" : 'Se connecter'}
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-3 w-full text-center text-xs text-[#565B6B] transition hover:text-[#4F46E5]"
          >
            {isSignUp ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  )
}
