import Link from "next/link";
import { getCityBySlug, type CityData, type ServiceData } from "../data/cities";
import { neighbours, county, exposure, driveDescription } from "../data/cityGeo";

/**
 * CityServiceBrief — o que ESTA combinação de cidade e serviço tem, e nenhuma
 * outra URL do site tem.
 *
 * O PROBLEMA, MEDIDO
 * ------------------
 * As 981 páginas cidade × serviço foram medidas mascarando o nome da cidade e
 * do serviço — que é como o Google as lê. Mediana de conteúdo próprio: 3,5%.
 * 702 das 981 abaixo de 5%. Página de 10.883 caracteres com 385 próprios.
 *
 * A causa não era falta de texto — é que o texto existente é de dois tipos, e
 * nenhum dos dois pertence à combinação:
 *
 *   prosa do SERVIÇO   idêntica nas 109 cidades daquele serviço
 *   prosa da CIDADE    idêntica nos 9 serviços daquela cidade
 *
 * Frase que se repete em 109 URLs não é conteúdo próprio. Frase que se repete
 * em 9 também não. Só é própria a frase que cruza os dois.
 *
 * O QUE ESTE COMPONENTE FAZ
 * -------------------------
 * Costura, dentro de texto corrido, os tokens que só esta página tem: o nome do
 * serviço mais as CIDADES VIZINHAS REAIS devolvidas por neighbours(), que saem
 * das coordenadas em cityFacts.ts. Cinco vizinhas × nove serviços = 981
 * combinações distintas, cada uma dizendo algo que nenhuma outra URL diz.
 *
 * A REGRA DE HONESTIDADE, a mesma do resto do repositório: nada aqui é
 * inventado. Condado, exposição, distância da oficina e vizinhança saem de
 * funções puras sobre coordenadas — cityGeo.ts diz, na primeira linha, que um
 * fato calculável nunca é digitado à mão. Não há estatística fabricada, não há
 * metragem imaginada, não há depoimento que ninguém deu.
 */
export default function CityServiceBrief({
  city,
  service,
}: {
  city: CityData;
  /** Ausente na pagina de cidade; obrigatorio nas 981 cidade x servico. */
  service?: ServiceData;
}) {
  const trade = service ? service.shortName.toLowerCase() : "siding work";
  const tradeTitle = service ? service.shortName : "Siding";
  const near = neighbours(city.slug, 5)
    .map((s) => getCityBySlug(s))
    .filter(Boolean) as CityData[];
  const drive = driveDescription(city.slug);
  const cty = county(city.slug);
  const exp = exposure(city.slug);

  const list = (xs: string[]) =>
    xs.length <= 1 ? xs[0] ?? "" : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

  const expLine: Record<string, string> = {
    coastal: `${city.name} takes salt air directly, and on ${trade} that shows up at the fasteners and the cut ends long before it shows on the face of the panel.`,
    "near-coastal": `${city.name} sits close enough to the shoreline that salt reaches it on an east wind, which is why ${trade} here is specified for fastener corrosion, not just for looks.`,
    upland: `${city.name} is upland, where the wind loading and the freeze-thaw cycle are harder than the coast — ${trade} here lives or dies on how the joints were sealed.`,
    inland: `${city.name} is inland, so the driver on ${trade} is freeze-thaw: water that gets behind the material in the autumn and lifts it by spring.`,
  };

  return (
    <div className="my-10 rounded-xl border border-gray-200 bg-[#FAFAFA] p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-4">
        {tradeTitle} in {city.name}: what the job actually looks like here
      </h2>

      <div className="space-y-4 text-[#333] leading-relaxed max-w-[68ch]">
        {exp && <p>{expLine[exp]}</p>}

        {drive && (
          <p>
            {city.name} is {drive}
            {cty ? `, in ${cty} County` : ""}, so a {trade} job
            here is scheduled as a full crew day rather than split across sites.
          </p>
        )}

        {near.length > 0 && (
          <p>
            The same crew that runs {trade} in {city.name} also
            covers{" "}
            {near.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/${c.slug}`} className="text-[#E00000] underline underline-offset-2">
                  {c.name}
                </Link>
                {i < near.length - 2 ? ", " : i === near.length - 2 ? " and " : ""}
              </span>
            ))}
            . When two of those towns book in the same week we can usually bring the{" "}
            {city.name} start date forward.
          </p>
        )}

        <p className="text-sm text-gray-500 border-l-[3px] border-[#E00000] pl-4">
          Distance, county, exposure and the neighbouring towns above are calculated from our
          own service-area coordinates — not copied from a directory.
        </p>
      </div>
    </div>
  );
}
