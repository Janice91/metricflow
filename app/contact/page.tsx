"use client";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="font-display text-4xl font-bold">Contactez-nous</h1>
      <p className="mt-2 text-muted">Une question ? On vous r&#xE9;pond en moins de 2 heures.</p>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        {sent ? (
          <div className="card p-12 text-center">
            <p className="text-5xl">&#x1F4E8;</p>
            <h2 className="font-display mt-3 text-2xl font-semibold">Message envoy&#xE9; !</h2>
            <p className="mt-2 text-muted">Merci, nous revenons vers vous tr&#xE8;s vite (d&#xE9;mo).</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="card space-y-5 p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div><label className="label" htmlFor="n">Nom</label><input id="n" required className="field" /></div>
              <div><label className="label" htmlFor="e">E-mail</label><input id="e" type="email" required className="field" /></div>
            </div>
            <div>
              <label className="label" htmlFor="s">Sujet</label>
              <select id="s" className="field"><option>Question sur une r&#xE9;servation</option><option>Devis longue dur&#xE9;e</option><option>Location entreprise</option><option>Autre</option></select>
            </div>
            <div><label className="label" htmlFor="m">Message</label><textarea id="m" required rows={5} className="field" /></div>
            <button className="btn btn-primary w-full">Envoyer</button>
          </form>
        )}
        <aside className="space-y-4">
          <div className="card p-5"><p className="text-2xl">&#x1F4DE;</p><p className="mt-1 font-semibold">01 80 00 00 00</p><p className="text-sm text-muted">7j/7, 7h &#x2013; 22h</p></div>
          <div className="card p-5"><p className="text-2xl">&#x2709;&#xFE0F;</p><p className="mt-1 font-semibold">contact@driveo.fr</p><p className="text-sm text-muted">R&#xE9;ponse sous 2h</p></div>
          <div className="card p-5"><p className="text-2xl">&#x1F198;</p><p className="mt-1 font-semibold">Assistance 24/7</p><p className="text-sm text-muted">01 80 00 00 99</p></div>
        </aside>
      </div>
    </div>
  );
}
