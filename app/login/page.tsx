'use client'
// Ce composant est la page de connexion / inscription
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  // email et password : ce que l'utilisateur tape dans le formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // isSignUp : true = mode "inscription", false = mode "connexion"
  const [isSignUp, setIsSignUp] = useState(false)
  // error : le message d'erreur affiche si la connexion echoue
  const [error, setError] = useState('')
  // loading : true pendant qu'on attend la reponse de Supabase (desactive le bouton)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  // Cette fonction s'execute quand on clique sur le bouton "Se connecter"
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault() // empeche la page de se recharger
    setError('')
    setLoading(true)
    // Selon le mode, on appelle soit signUp (creer un compte) soit signInWithPassword (se connecter)
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.push('/dashboard') // succes : on redirige vers le dashboard
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo et titre */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#6366F1] font-mono-data text-sm font-bold text-white">
            MF
          </div>
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight text-[#F2F3F7]">MetricFlow</h1>
            <p className="mt-1 font-mono-data text-[11px] uppercase tracking-widest text-[#8A90A6]">
              Suivi de performance publicitaire
            </p>
          </div>
        </div>

        {/* Le formulaire : appelle handleSubmit quand on clique sur "Se connecter" */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#232838] bg-[#12151F] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
        >
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-[#8A90A6]">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20"
                placeholder="vous@agence.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#8A90A6]">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#232838] bg-[#171B28] px-3 py-2 text-sm text-[#F2F3F7] outline-none transition placeholder:text-[#565C70] focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Affiche le message d'erreur seulement s'il y en a un */}
          {error && (
            <p className="mt-3 rounded-md bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-md bg-[#6366F1] py-2.5 text-sm font-medium text-white transition hover:bg-[#5457E5] disabled:opacity-60"
          >
            {loading ? 'Chargement…' : isSignUp ? "Créer mon compte" : 'Se connecter'}
          </button>
          {/* Ce bouton bascule entre "mode connexion" et "mode inscription" */}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-3 w-full text-center text-xs text-[#8A90A6] transition hover:text-[#6366F1]"
          >
            {isSignUp ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  )
}
