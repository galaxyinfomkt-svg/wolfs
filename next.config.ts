import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    /*
     * remotePatterns COM pathname.
     *
     * Antes cada entrada tinha so `hostname`. `/_next/image` e um proxy: ele
     * baixa a URL e devolve o arquivo DE DENTRO de wolfs-siding.com, com o
     * nosso certificado, em cache por um ano (minimumCacheTTL abaixo). Sem
     * `pathname`, `storage.googleapis.com` liberava QUALQUER bucket publico do
     * Google Cloud - e abrir um leva um minuto e nao custa nada.
     *
     * Isto foi MEDIDO em producao, nao deduzido. O teste que separa "host
     * recusado" de "arquivo inexistente":
     *
     *   img.youtube.com (fora da config)          400 INVALID_IMAGE_OPTIMIZE_REQUEST
     *   storage.googleapis.com/bucket-de-terceiro 404  <- host ACEITO
     *
     * 400 e a recusa; 404 e o otimizador tendo aceitado a URL e so nao achado o
     * arquivo. Ou seja: o proxy estava aberto.
     *
     * E assim que um dominio limpo aparece em lista de reputacao "hospedando
     * conteudo malicioso" sem ninguem ter invadido nada: basta espalhar links
     * wolfs-siding.com/_next/image?url=<arquivo do atacante>.
     *
     * Agora cada host esta presa ao caminho que o site realmente usa - conferi
     * as 21 referencias de storage.googleapis e as 14 de filesafe no repo:
     * todas dentro do prefixo da NOSSA conta GoHighLevel (BCczy6muFwhd63dPhKCC).
     *
     * img.youtube.com ENTROU na lista, e isso conserta um bug separado:
     * YouTubeEmbed.tsx passa https://img.youtube.com/vi/<id>/maxresdefault.jpg
     * para o next/image, e como o host nao estava aqui, TODA miniatura de video
     * do site respondia 400.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/msgsndr/BCczy6muFwhd63dPhKCC/**",
      },
      {
        protocol: "https",
        hostname: "assets.cdn.filesafe.space",
        pathname: "/BCczy6muFwhd63dPhKCC/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    qualities: [40, 60, 75],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  /*
   * Cabecalhos de seguranca. O site NAO tinha nenhum - conferido na resposta de
   * producao: sem CSP, sem X-Content-Type-Options, sem X-Frame-Options, sem
   * Referrer-Policy, sem Permissions-Policy. So o HSTS que a Vercel poe
   * sozinha. Os outros dois sites da carteira (JH e Alfa) ja tinham o conjunto
   * completo; a Wolfs ficou sem.
   *
   * A CSP foi montada a partir da superficie REAL do site, enumerada no codigo,
   * nao de um modelo generico. Errar aqui derruba o formulario, que e o que
   * gera o lead, entao a lista e exatamente esta:
   *
   *   script  beta.leadconnectorhq.com (chat), reputationhub.site (avaliacoes)
   *   frame   api.leadconnectorhq.com (formulario), reputationhub.site,
   *           maps.google.com + www.google.com (mapa), youtube-nocookie
   *   img     storage.googleapis.com, assets.cdn.filesafe.space, img.youtube.com
   *   font    nenhum externo: a Inter vem do next/font, servida do proprio site
   *
   * 'unsafe-inline' e 'unsafe-eval' ficam porque os widgets do GoHighLevel
   * precisam deles. Nao e o ideal, e esta registrado como divida: tirar exige
   * testar cada widget, e nenhum lead pode cair no teste.
   *
   * O Turnstile da Cloudflare que o formulario carrega roda DENTRO do iframe do
   * GHL, que e outra origem com CSP propria - a nossa nao alcanca ele, entao
   * nao precisa estar aqui.
   */
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.leadconnectorhq.com https://reputationhub.site",
      "style-src 'self' 'unsafe-inline' https://*.leadconnectorhq.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https: wss:",
      "frame-src 'self' https://*.leadconnectorhq.com https://reputationhub.site https://maps.google.com https://www.google.com https://www.youtube-nocookie.com https://www.youtube.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "base-uri 'self'",
      "form-action 'self' https://*.leadconnectorhq.com",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      /*
       * CORRECAO DE UM ERRO MEU, do commit anterior.
       *
       * Eu escrevi ali que o site estava "sem protecao de deploy nenhuma" e que
       * os enderecos .vercel.app eram "copias abertas e indexaveis". ERRADO.
       * Fui conferir na API depois de ja ter subido:
       *
       *   ssoProtection: { enabled: true, deploymentType: "all_except_custom_domains" }
       *
       * Ou seja: wolfs-siding-galaxy-mkts-projects.vercel.app exige login da
       * Vercel. Medido - uma requisicao a /robots.txt naquele host responde 302
       * para vercel.com/sso-api, nao a pagina. Nunca houve copia aberta aqui.
       *
       * Eu tinha verificado essa configuracao no OUTRO site da carteira (a JH,
       * onde a protecao esta mesmo toda desligada) e ASSUMI que valia para
       * este. Nao vale. Assumir em vez de medir e exatamente o erro que o resto
       * deste levantamento evitou.
       *
       * A regra FICA, mesmo assim, e por um motivo so: ela nao depende da
       * configuracao do painel. Se alguem desligar o SSO amanha - um clique -
       * o noindex continua valendo. Cabecalho no codigo nao regride sozinho.
       *
       * A condicao casa SO host terminado em .vercel.app, de proposito: uma
       * lista de permitidos deixaria o dominio de verdade a um Host inesperado
       * de distancia de um noindex em producao. Assim nao existe entrada
       * possivel que alcance wolfs-siding.com.
       */
      {
        source: "/(.*)",
        has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    // Legacy /service/* URLs from the previous site (indexed as recently as Jan
    // 2025) now 404. 301 them to the closest current equivalent so their link
    // equity is recovered instead of dropped. Old slugs look like
    // /service/vinyl-siding-contractor-serving-northborough-ma — we match on the
    // leading service keyword and send them to the matching statewide service
    // page (the city tail can't be turned into /{city}/{service} in static
    // config). Anything unmatched falls through to the home page — never a 404.
    // NOTE: there is no /services index route, so destinations must be real
    // /services/{service} pages. Confirmed prefix: "vinyl-siding" (from the
    // known indexed URL); the rest are inferred and can be tuned once the full
    // legacy slug list is exported from Search Console.
    const svc = (kw: string, service: string) => ({
      source: `/service/:slug(${kw}[^/]*)`,
      destination: `/services/${service}`,
      permanent: true,
    });
    return [
      svc("vinyl-siding", "vinyl-siding-installation"),
      svc("clapboard", "clapboard-siding-installation"),
      svc("hardie", "hardie-plank-siding-installation"),
      svc("cedar", "cedar-shingle-siding"),
      svc("exterior-trim", "exterior-trim-work"),
      svc("siding-repair", "siding-repair-services"),
      svc("full-siding", "full-siding-replacement"),
      svc("gutter", "gutter-installation"),
      svc("roofing", "roofing-installation"),
      // Catch-all safety net: any other legacy /service/* URL → home (no 404).
      { source: "/service/:slug*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
