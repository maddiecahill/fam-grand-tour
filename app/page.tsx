"use client";

import { useEffect, useState } from "react";
import Map from "../components/Map";
import { properties } from "../data/properties";
export default function Home() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [mappedProperties, setMappedProperties] = useState(properties);

 useEffect(() => {
  const geocodeProperties = async () => {
    const updated = await Promise.all(
      properties.map(async (home) => {
        try {
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              home.address
            )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
          );
          const data = await res.json();
          const coords = data.features?.[0]?.center;

          if (!coords) return home;

          return {
            ...home,
            lng: coords[0],
            lat: coords[1],
          };
        } catch {
          return home;
        }
      })
    );

    setMappedProperties(updated);
  };

  geocodeProperties();
}, []);

  return (
    <main className="min-h-screen bg-[#0f1720] text-white">
     <section className="relative overflow-hidden border-b border-white/10 min-h-[520px] md:min-h-[640px] flex items-center">
     <div className="absolute inset-0">
  <img
    src="/public-background.png"
    alt=""
    className="h-full w-full object-cover opacity-30"
  />
  <div className="absolute inset-0 bg-[#0f1720]/30" />
</div>
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center md:px-12 md:py-28">
<div className="mb-10 flex justify-center pt-4">    <img
      src="/fam-logo.png"
      alt="First And Main"
      className="h-10 w-auto md:h-12"
    />
  </div>

  <p className="mb-4 text-sm uppercase tracking-[0.28em] text-white/60">
  </p>
          <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-tight md:text-7xl md:leading-[1.02]">
            THE FAM GRAND TOUR
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
            A curated tour of exceptional homes and elevated
            experiences across Snohomish, Woodinville, and the Greater Seattle Area.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-[#c6a45e] px-6 py-3 text-sm font-medium text-[#111927]">
              Explore the Tour
            </button>
            <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white">
              View Featured Homes
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#111927] px-6 py-16 md:px-12">
  <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#c6a45e]">
              Event Overview
            </p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              A more intentional way to tour the market.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              The Grand Tour brings together a curated collection of homes hosted
              by First And Main agents across the region. Explore featured
              properties, plan your stops, and experience a weekend designed to
              showcase not only exceptional homes, but the communities around
              them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["12+", "Homes on Tour"],
              ["2 Days", "Weekend Stops"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-3xl font-semibold">{value}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/55">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0f1720] px-6 py-10 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#c6a45e]">
            ENTER TO WIN
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            WASHINGTON WINE EXPERIENCE PACKAGE
          </h3>

          <div className="mt-6 flex flex-wrap gap-3">
            {["Day", "City", "Price", "Featured", "Hosted By"].map((filter) => (
              <button
                key={filter}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

            <section className="bg-[#0f1720] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#c6a45e]">
            Interactive Map
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Explore the Tour
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
            Use the interactive map to discover homes across the weekend, then
            select a property to view details, get directions, or visit the full
            listing site.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-[#131d29] p-4">
              <Map
  properties={mappedProperties}
  selectedAddress={selectedAddress}
/>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
              {mappedProperties.map((home) => (
                <div
  key={home.address}
  onClick={() => setSelectedAddress(home.address)}
  className={`min-w-[320px] max-w-[360px] flex-shrink-0 snap-start rounded-[1.75rem] border bg-white p-5 text-[#111927] cursor-pointer transform-gpu transition-all duration-300 flex flex-col ${
    selectedAddress === home.address
      ? "border-[#c6a45e] ring-2 ring-[#c6a45e]/30 shadow-[0_18px_40px_rgba(0,0,0,0.18)] -translate-y-2"
      : "border-[#e6e8eb] hover:-translate-y-1 hover:border-[#c6a45e]/45 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
  }`}
>
                  <div className="aspect-[16/9] overflow-hidden rounded-[1.25rem] bg-[#e9ecef]">
  {home.image && (
    <img
      src={home.image}
      alt={home.address}
      className="h-full w-full object-cover"
    />
  )}
</div>

                  <div className="mt-5 flex items-start justify-between gap-4">
  <div className="min-h-[120px] flex-1">
    {/* City */}
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a6b16]">
      {home.city}
    </p>

    {/* Address */}
    <h3 className="mt-2 text-[15px] font-semibold leading-[1.35] text-[#111927]">
      {home.address}
    </h3>

    {/* Day(s) */}
    <div className="mt-3 min-h-[20px]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b16]">
        {home.day2 ? `${home.day} + ${home.day2}` : home.day}
      </p>
    </div>
  </div>

  

  {/* Featured Badge */}
  <span className="rounded-full bg-[#c6a45e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
    Featured
  </span>
</div>

                  <div className="mt-3 min-h-[28px]">
  {home.time ? (
    <p className="text-sm text-[#4f5d6b]">{home.time}</p>
  ) : (
    <p className="text-sm text-transparent">placeholder</p>
  )}
</div>

                  <div className="mt-auto pt-5 flex flex-wrap gap-3">
  {home.link && (
    <a
      href={home.link}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex h-11 items-center justify-center rounded-full bg-[#111927] px-5 text-sm font-medium text-white whitespace-nowrap"
    >
      View Property Site
    </a>
  )}

  <a
    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(home.address)}`}
    target="_blank"
    rel="noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex h-11 items-center justify-center rounded-full border border-[#d9dee3] px-5 text-sm font-medium text-[#111927] whitespace-nowrap"
  >
    Get Directions
  </a>
</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="border-y border-white/10 bg-[#111927] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#c6a45e]">
            Signature Properties
          </p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Grand Tour Highlights
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
            A curated collection of standout homes featured throughout the
            weekend.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {["Featured Home One", "Featured Home Two", "Featured Home Three"].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#182332]"
                >
                  <div className="aspect-[4/3] bg-[linear-gradient(135deg,#d9dde3,#b8c1cc)]" />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#c6a45e]">
                      Snohomish
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold">{item}</h3>
                    <p className="mt-3 text-white/72">
                      A refined property selected as part of this weekend’s Grand Tour.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1720] px-6 py-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div className="min-h-[320px] rounded-[2rem] bg-[linear-gradient(135deg,#d5d9e0,#aab4c0)]" />
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.24em] text-[#c6a45e]">
              First And Main Hub
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Make First And Main Your Home Base
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              Stop by the office during Grand Tour weekend for event details,
              featured home recommendations, and a curated starting point before
              you head out.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-[#c6a45e] px-5 py-3 text-sm font-medium text-[#111927]">
                Get Office Directions
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}