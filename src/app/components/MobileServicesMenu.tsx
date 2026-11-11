"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VINYL_UPGRADES } from "../data/vinylUpgrades";
import { MENU_CATALOG, serviceHref } from "./ServicesMenu";

const VINYL = "/services/vinyl-siding-installation";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* Phone version of the desktop "Services" dropdown: the same 5 groups and 20
   services as an accordion, and Vinyl Siding opens the same upgrade options
   as the desktop flyout. Links close the menu through `onNavigate` (or the
   parent's click handler). */
export default function MobileServicesMenu({ citySlug, label = "Services", onNavigate }: { citySlug?: string; label?: string; onNavigate?: () => void }) {
  const [group, setGroup] = useState<string | null>(MENU_CATALOG[0]?.group ?? null);
  const [vinylOpen, setVinylOpen] = useState(false);

  /* This component only exists while the phone menu is open: lock the page
     behind it so a swipe scrolls the menu, not the page. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="py-1">
      <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#E00000]">{label}</div>
      <div className="mx-2 overflow-hidden rounded-xl border border-gray-100">
        {MENU_CATALOG.map((g) => {
          const open = group === g.group;
          return (
            <div key={g.group} className="border-b border-gray-100 last:border-b-0">
              <button
                type="button"
                onClick={() => setGroup(open ? null : g.group)}
                aria-expanded={open}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-bold ${open ? "bg-[#E00000]/5 text-[#C00000]" : "text-black"}`}
              >
                {g.group}
                <span className="flex items-center gap-2 text-xs font-medium text-[#555]">
                  {g.items.filter((s) => s.path).length}
                  <Chevron open={open} />
                </span>
              </button>
              {open && (
                <ul className="pb-2">
                  {g.items.map((s) =>
                    !s.path ? null : s.path === VINYL ? (
                      <li key={s.name}>
                        <div className="flex items-stretch">
                          <Link href={serviceHref(s.path, citySlug)} onClick={onNavigate} className="flex-1 px-6 py-3 text-sm text-[#333]">
                            {s.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setVinylOpen(!vinylOpen)}
                            aria-expanded={vinylOpen}
                            aria-label="Show upgrades from vinyl siding"
                            className="m-1.5 flex items-center gap-1 rounded-lg bg-[#E00000]/10 px-3 text-[11px] font-bold uppercase text-[#C00000]"
                          >
                            Upgrades <Chevron open={vinylOpen} />
                          </button>
                        </div>
                        {vinylOpen && (
                          <div className="mx-3 mb-2 rounded-xl border border-gray-200 bg-[#FAFAFA] p-3">
                            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#C00000]">
                              Vinyl or an upgrade? <span className="font-normal normal-case tracking-normal text-[#555]">Step up from vinyl to:</span>
                            </p>
                            <ul className="grid grid-cols-2 gap-1.5">
                              {VINYL_UPGRADES.map((u) => (
                                <li key={u.path}>
                                  <Link href={u.path} onClick={onNavigate} className="block h-full rounded-lg border border-gray-200 bg-white px-2.5 py-2">
                                    <span className="block text-[13px] font-semibold leading-tight text-black">{u.name}</span>
                                    <span className="block text-[11px] text-[#555]">{u.short}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link href="/services/vinyl-siding-upgrades" onClick={onNavigate} className="mt-2 block rounded-lg bg-black px-3 py-2.5 text-center text-xs font-bold text-white">
                              Compare vinyl and upgrades →
                            </Link>
                          </div>
                        )}
                      </li>
                    ) : (
                      <li key={s.name}>
                        <Link href={serviceHref(s.path, citySlug)} onClick={onNavigate} className="block px-6 py-3 text-sm text-[#333]">
                          {s.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <Link href="/services" onClick={onNavigate} className="mx-2 mt-2 block rounded-lg bg-[#F5F5F5] px-4 py-3 text-center text-sm font-bold text-black">
        All services →
      </Link>
    </div>
  );
}
