"use client";

import { useState, useEffect, useRef } from "react";

export default function LazyIframe(
  props: React.IframeHTMLAttributes<HTMLIFrameElement> & {
    src: string;
    clickOnly?: boolean;
    eager?: boolean;
    placeholderLabel?: string;
  }
) {
  const { src, clickOnly, eager, placeholderLabel = "Loading form...", ...rest } = props;
  const [loaded, setLoaded] = useState(eager === true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eager: already loaded via the initial state
    if (eager || clickOnly) return;

    /* Third-party iframes (the GHL form pulls ~2 MB, Google Maps ~0.5 MB) used
       to start as soon as the page hydrated, competing with the hero image for
       bandwidth and CPU (Lighthouse mobile: LCP 3.6–5.1 s, TBT 1–1.5 s). Now an
       iframe starts only once the page has finished loading and the browser is
       idle AND it is near the viewport — or immediately on any user interaction.
       The phone number stays visible in the placeholder meanwhile. */
    let cancelled = false;
    let near = false;
    let ready = false;
    const activate = () => {
      if (cancelled) return;
      cancelled = true;
      setLoaded(true);
    };
    const maybe = () => { if (near && ready) activate(); };

    const el = containerRef.current;
    const observer = el
      ? new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { near = true; maybe(); } }, { rootMargin: "400px" })
      : null;
    if (el && observer) observer.observe(el);

    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200));
    const onLoad = () => idle(() => { ready = true; maybe(); });
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const onInteract = () => { ready = true; near = near || !el; maybe(); };
    events.forEach((e) => window.addEventListener(e, onInteract, { once: true, passive: true }));

    return () => {
      cancelled = true;
      if (observer) observer.disconnect();
      window.removeEventListener("load", onLoad);
      events.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, [clickOnly, eager]);

  /* Bee Pro (GHL) forms: load the official embed script once, alongside the
     form. It talks to the form iframe and sets the iframe to the form's exact
     height — no blank space under the button, and nothing cut off when the
     Cloudflare check appears or fields change in the form builder. */
  const isForm = src.includes("/widget/form/");
  useEffect(() => {
    if (!loaded || !isForm) return;
    if (document.querySelector('script[data-ghl-form-embed]')) return;
    const s = document.createElement("script");
    s.src = "https://link.msgsndr.com/js/form_embed.js";
    s.async = true;
    s.dataset.ghlFormEmbed = "1";
    document.body.appendChild(s);
  }, [loaded, isForm]);

  const handleClick = () => {
    if (!loaded) setLoaded(true);
  };

  return (
    <div ref={containerRef} className="relative" onClick={clickOnly ? handleClick : undefined}>
      {!loaded && (
        clickOnly ? (
          /*
           * Botao honesto, nao fachada de formulario.
           *
           * O QUE ESTAVA AQUI: tres <div> desenhados para parecer campos de
           * texto, rotulados "Full Name", "Email Address" e "Phone Number". O
           * proprio comentario do codigo dizia "looks like a real form". Nao
           * eram campos: clicar em qualquer lugar so carregava o iframe.
           *
           * DOIS MOTIVOS PARA SAIR, e o segundo e o que pesa:
           *
           * 1. Quebrava para quem usa. A pessoa clicava em "Full Name" e
           *    comecava a digitar - as teclas nao iam para lugar nenhum,
           *    porque o campo era um <div> e o iframe ainda estava montando.
           *
           * 2. E o padrao que classificador de conteudo enganoso procura.
           *    Campo de formulario falso numa pagina que captura dado pessoal
           *    e exatamente o tipo de coisa que a politica de engenharia social
           *    do Google descreve. NAO estou dizendo que foi isto que sinalizou
           *    o site - a JH foi sinalizada e nao tem esta fachada, entao a
           *    causa comum e outra. Mas num dominio que JA esta sob suspeita,
           *    nao se mantem de proposito algo que imita interface.
           *
           * Agora e um botao que se anuncia como botao: diz o que vai
           * acontecer, e nao finge ser aquilo que ainda nao carregou.
           */
          <div
            role="button"
            tabIndex={0}
            aria-label="Load the free estimate form"
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl z-10 cursor-pointer border border-gray-200 shadow-sm"
          >
            <div className="w-full max-w-xs px-4 flex flex-col items-center">
              <p className="text-sm font-bold text-black text-center">Get Your Free Estimate</p>
              <p className="mt-1 text-xs text-gray-500 text-center">Takes about a minute</p>
              <span className="mt-4 h-10 w-full bg-[#E00000] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                Open the form
              </span>
            </div>
            <a href="tel:+17744841895" onClick={(e) => e.stopPropagation()} className="mt-3 text-[#E00000] text-xs font-bold hover:underline">or call (774) 484-1895</a>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F5F5] rounded-xl animate-pulse z-10">
            <svg className="w-8 h-8 text-[#E00000] mb-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            <span className="text-sm text-[#595959] font-medium">{placeholderLabel}</span>
            <a href="tel:+17744841895" className="mt-3 text-[#E00000] text-sm font-bold hover:underline">(774) 484-1895</a>
          </div>
        )
      )}
      <iframe {...rest} src={loaded ? src : undefined} loading="lazy" />
    </div>
  );
}
