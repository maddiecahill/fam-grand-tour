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
      <section className="border-b border-white/10 bg-[linear-gradient(180deg,#111927_0%,#0f1720_100%)] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-white/60">
            Presented by First And Main
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl md:leading-[1.02]">
            FIRST AND MAIN GRAND TOUR
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
            A curated weekend of exceptional homes, open houses, and elevated
            experiences across Snohomish, Woodinville, and beyond.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-[#d4af37] px-6 py-3 text-sm font-medium text-[#111927]">
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
            <p className="text-sm uppercase tracking-[0.24em] text-[#d4af37]">
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
              ["2 Markets", "Featured Areas"],
              ["FAM", "Hosted Experiences"],
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
          <p className="text-sm uppercase tracking-[0.24em] text-[#d4af37]">
            Refine the Tour
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Find the homes that fit your weekend.
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
          <p className="text-sm uppercase tracking-[0.24em] text-[#d4af37]">
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

         <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.9fr]">
  <div className="rounded-[2rem] border border-white/10 bg-[#131d29] p-4">
<Map properties={mappedProperties} selectedAddress={selectedAddress} />  </div>

  <div className="space-y-4">
              {properties.map((home) => (
               <div
  key={home.address}
  onClick={() => setSelectedAddress(home.address)}
  className="cursor-pointer rounded-[1.75rem] border border-white/10 bg-white p-5 text-[#111927] transition hover:-translate-y-[1px] hover:shadow-lg"
>
                  <div className="aspect-[16/9] rounded-[1.25rem] bg-[#e9ecef]" />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#8a6b16]">
                        {home.day} · {home.city}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">{home.address}</h3>
                    </div>
                    {home.featured && (
                      <span className="rounded-full bg-[#f6edd1] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#8a6b16]">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-[#4f5d6b]">{home.time}</p>
                  <p className="mt-2 text-lg font-medium">{home.price}</p>
                  <p className="mt-2 text-sm text-[#4f5d6b]">{home.details}</p>
                  <p className="mt-4 text-sm leading-7 text-[#334155]">{home.hook}</p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-full bg-[#111927] px-4 py-2 text-sm font-medium text-white">
                      View Property Site
                    </button>
                    <button className="rounded-full border border-[#d9dee3] px-4 py-2 text-sm font-medium text-[#111927]">
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#111927] px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[#d4af37]">
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
                    <p className="text-xs uppercase tracking-[0.22em] text-[#d4af37]">
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
            <p className="text-sm uppercase tracking-[0.24em] text-[#d4af37]">
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
              <button className="rounded-full bg-[#d4af37] px-5 py-3 text-sm font-medium text-[#111927]">
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