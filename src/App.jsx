import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Award, Users, CalendarDays, Camera, Trophy, Tent, MapPin } from "lucide-react";
function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = "", children, ...props }) {
  return <button className={className} {...props}>{children}</button>;
}

const badges = [
  { id: "fire-warden", title: "Fire Warden", image: "badges/fire_warden.png", description: "Responsible for fire tending, poking, monitoring, and pretending this is a serious civic office." },
  { id: "master-chef", title: "Master Chef", image: "badges/master_chef.png", description: "Produced food under bush conditions without causing a group incident." },
  { id: "drinkmaster", title: "Drinkmaster", image: "badges/drink_master.png", description: "Maintained morale through coffee, tea, hydration, or other camp-approved beverages." },
  { id: "content-creator", title: "Content Creator", image: "badges/photo_creator.png", description: "Documented the outing for memories, evidence, blackmail, or the group chat." },
  { id: "stick-twig-gatherer", title: "Stick & Twig Gatherer", image: "badges/stick_gatherer.png", description: "Collected the small burnable things without which civilisation collapses." },
  { id: "mini-chainsaw-badge", title: "Mini Chainsaw Badge", image: "badges/chainsaw_badge.png", description: "For services to tiny forestry, controlled danger, and tool-based confidence." },
  { id: "driver", title: "Road Captain", image: "badges/road_captain.png", description: "Drove people, supplies, dogs, chairs, bags, or the entire operation." },
  { id: "first-escape", title: "I Survived My First Escape", image: "badges/first_time.png", description: "Awarded for completing your first camp escape with the group." },
  { id: "canine-handler", title: "Canine Handler", image: "badges/canine_handler.png", description: "Managed, entertained, protected, or emotionally negotiated with the dogs." },
  { id: "finska-champion", title: "Finska Champion", image: "badges/finska_champion.png", description: "Achieved glory in the ancient and highly regulated sport of throwing wood at wood." },
  { id: "sous-chef", title: "Sous Chef", image: "badges/sous_chef.png", description: "Chopped, fetched, stirred, plated, assisted, or hovered usefully near the food." },
  { id: "pointer-coordinator", title: "Pointer/Coordinator", image: "badges/pointer.png", description: "Pointed, delegated, directed, scheduled, clarified, or held the group together through force of admin." }
,
];

const trips = [
  { id: "lederderg-2026-05-10", name: "Lerderderg Campground", date: "2026-05-10", location: "Lerderderg Campground" },
  { id: "herbs-joint-2026-04-12", name: "Herbs Joint", date: "2026-04-12", location: "Herbs Joint" },
  { id: "toorongo-2025-05-24", name: "Toorongo Campground", date: "2025-05-24", location: "Toorongo Campground" },
  { id: "perc-boyer-2024-09-15", name: "Perc Boyer Lookout", date: "2024-09-15", location: "Perc Boyer Lookout" },
  { id: "lederderg-2024-06-01", name: "Lerderderg Campground", date: "2024-06-01", location: "Lerderderg Campground" },
];

const attendees = [
  { id: "eve", name: "Eve", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "content-creator", tripId: "perc-boyer-2024-09-15"}, { badgeId: "finska-champion", tripId: "lederderg-2026-05-10"},{ badgeId: "sous-chef", tripId: "lederderg-2024-06-01" }] },
  { id: "verity", name: "Verity", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "pointer-coordinator", tripId: "toorongo-2025-05-24" },{ badgeId: "canine-handler", tripId: "perc-boyer-2024-09-15" }] },
  { id: "cameron", name: "Cameron", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "master-chef", tripId: "lederderg-2024-06-01" },{ badgeId: "fire-warden", tripId: "lederderg-2024-06-01" },{ badgeId: "content-creator", tripId: "lederderg-2026-05-10"}, { badgeId: "driver", tripId: "lederderg-2024-06-01" }, { badgeId: "stick-twig-gatherer", tripId: "toorongo-2025-05-24"},{ badgeId: "finska-champion", tripId: "lederderg-2024-06-01"},] },
  { id: "angus", name: "Angus", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "fire-warden", tripId: "lederderg-2024-06-01" }, { badgeId: "canine-handler", tripId: "lederderg-2026-05-10" },{ badgeId: "driver", tripId: "lederderg-2024-06-01" }, { badgeId: "finska-champion", tripId: "herbs-joint-2026-04-12"}] },
  { id: "jake", name: "Jake", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "fire-warden", tripId: "lederderg-2024-06-01" }] },
  { id: "deb", name: "Deb", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "finska-champion", tripId: "lederderg-2024-06-01"}, { badgeId: "drinkmaster", tripId: "lederderg-2024-06-01" }, { badgeId: "canine-handler", tripId: "lederderg-2026-05-10" }] },
  { id: "matt", name: "Matt", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "sous-chef", tripId: "lederderg-2026-05-10" },{ badgeId: "fire-warden", tripId: "lederderg-2024-06-01" }] },
  { id: "brad", name: "Brad", earned: [{ badgeId: "drinkmaster", tripId: "lederderg-2024-06-01" }, { badgeId: "fire-warden", tripId: "lederderg-2024-06-01" }, { badgeId: "driver", tripId: "lederderg-2024-06-01" },{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "master-chef", tripId: "toorongo-2025-05-24" }] },
  { id: "char", name: "Char", earned: [{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }] },
  { id: "stephan", name: "Stephan", earned: [{ badgeId: "driver", tripId: "lederderg-2024-06-01" },{ badgeId: "first-escape", tripId: "lederderg-2024-06-01" }, { badgeId: "stick-twig-gatherer", tripId: "toorongo-2025-05-24" },{ badgeId: "content-creator", tripId: "perc-boyer-2024-09-15"}] },
  { id: "yasmin", name: "Yasmin", earned: [] },
  { id: "tim", name: "Tim", earned: [] },
  { id: "shelley", name: "Shelley", earned: [{ badgeId: "first-escape", tripId: "toorongo-2025-05-24" }] },
  { id: "cripsy", name: "Cripsy", earned: [{ badgeId: "driver", tripId: "toorongo-2025-05-24" }, { badgeId: "first-escape", tripId: "toorongo-2025-05-24" }, { badgeId: "mini-chainsaw-badge", tripId: "toorongo-2025-05-24" }] },
  { id: "maddie", name: "Maddie", earned: [] },
  { id: "kate", name: "Kate", earned: [] },
  { id: "emily", name: "Emily", earned: [] },
];

const photos = [
  { id: "photo-1", title: "Future camp photo", tripId: "lederderg-2026-05-10", caption: "Add real photos here once the archive goes live." },
  { id: "photo-2", title: "Group chat evidence", tripId: "toorongo-2025-05-24", caption: "Photo upload needs a storage service if friends are uploading directly." },
];

function getBadge(id) { return badges.find((badge) => badge.id === id); }
function getTrip(id) { return trips.find((trip) => trip.id === id); }
function formatDate(date) { return new Date(date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }); }
function initials(name) { return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(); }

export default function CampBadgesSite() {
  const [selectedAttendeeId, setSelectedAttendeeId] = useState(attendees[0].id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("people");

  const selectedAttendee = attendees.find((person) => person.id === selectedAttendeeId);
  const earnedBadgeIds = new Set(selectedAttendee.earned.map((entry) => entry.badgeId));
  const totalEarned = attendees.reduce((total, person) => total + person.earned.length, 0);
  const leaderboard = [...attendees].sort((a, b) => b.earned.length - a.earned.length || a.name.localeCompare(b.name));
  const filteredBadges = badges.filter((badge) => `${badge.title} ${badge.description}`.toLowerCase().includes(query.toLowerCase()));

  const yearlySummaries = useMemo(() => {
    const years = {};
    trips.forEach((trip) => {
      const year = new Date(trip.date).getFullYear();
      if (!years[year]) years[year] = { trips: [], awards: [] };
      years[year].trips.push(trip);
    });
    attendees.forEach((person) => {
      person.earned.forEach((entry) => {
        const trip = getTrip(entry.tripId);
        const year = new Date(trip.date).getFullYear();
        years[year].awards.push({ person, badge: getBadge(entry.badgeId), trip });
      });
    });
    return Object.entries(years).sort(([a], [b]) => Number(b) - Number(a));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f0df] text-neutral-950">
      <header className="border-b-4 border-neutral-950 bg-[#f7c62f]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border-4 border-neutral-950 bg-[#fff8df] p-6 shadow-[8px_8px_0_#111]">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#0b5fa5]">Camp Handbook • Badge Register • Evidence Pending</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-6xl">Cam's Gourmet Escape: Badge Archive</h1>
            <p className="mt-3 max-w-3xl text-base font-medium text-neutral-700">A mostly accurate record of questionable achievements on Cam's Gourmet Escapes.</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <StatCard icon={<Award />} label="Badge types" value={badges.length} />
            <StatCard icon={<Users />} label="Attendees" value={attendees.length} />
            <StatCard icon={<CalendarDays />} label="Trips logged" value={trips.length} />
            <StatCard icon={<Trophy />} label="Badges awarded" value={totalEarned} />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap gap-2">
          <TabButton active={view === "people"} onClick={() => setView("people")}>Attendees</TabButton>
          <TabButton active={view === "badges"} onClick={() => setView("badges")}>Badge Gallery</TabButton>
          <TabButton active={view === "leaderboard"} onClick={() => setView("leaderboard")}>Leaderboard</TabButton>
          <TabButton active={view === "trips"} onClick={() => setView("trips")}>Trip Log</TabButton>
          <TabButton active={view === "photos"} onClick={() => setView("photos")}>Photo Gallery</TabButton>
          <TabButton active={view === "years"} onClick={() => setView("years")}>Yearly Summaries</TabButton>
        </nav>

        {view === "people" && (
          <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <HandbookCard>
              <h2 className="mb-3 text-xl font-black">Roll Call</h2>
              <div className="space-y-2">
                {[...attendees]
  .sort((a, b) => b.earned.length - a.earned.length)
  .map((person) => (
                  <button key={person.id} onClick={() => setSelectedAttendeeId(person.id)} className={`w-full rounded-2xl border-2 border-neutral-950 px-4 py-3 text-left font-bold transition ${selectedAttendeeId === person.id ? "bg-[#f7c62f] shadow-[4px_4px_0_#111]" : "bg-white hover:bg-[#fff8df]"}`}>
                    <div>{person.name}</div>
                    <div className="text-sm font-medium text-neutral-600">{person.earned.length}/{badges.length} badges</div>
                  </button>
                ))}
              </div>
            </HandbookCard>

            <HandbookCard>
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-neutral-950 bg-[#0b5fa5] text-2xl font-black text-white">{initials(selectedAttendee.name)}</div>
                  <div>
                    <h2 className="text-3xl font-black">{selectedAttendee.name}</h2>
                    <p className="text-neutral-600">Badge progress: {Math.round((selectedAttendee.earned.length / badges.length) * 100)}%</p>
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-neutral-950 bg-[#d7e342] px-4 py-2 text-sm font-black">{selectedAttendee.earned.length}/{badges.length} earned</div>
              </div>

              <div className="mb-6 h-5 overflow-hidden rounded-full border-2 border-neutral-950 bg-white">
                <div className="h-full bg-[#d7e342]" style={{ width: `${(selectedAttendee.earned.length / badges.length) * 100}%` }} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {badges.map((badge) => {
                  const earned = earnedBadgeIds.has(badge.id);
                  const earnedEntry = selectedAttendee.earned.find((entry) => entry.badgeId === badge.id);
                  const trip = earnedEntry ? getTrip(earnedEntry.tripId) : null;
                  return <BadgeCard key={badge.id} badge={badge} earned={earned} trip={trip} compact />;
                })}
              </div>
            </HandbookCard>
          </section>
        )}

        {view === "badges" && (
          <section>
            <div className="mb-5 flex items-center gap-3 rounded-3xl border-4 border-neutral-950 bg-white p-3 shadow-[6px_6px_0_#111]">
              <Search className="h-5 w-5 text-neutral-500" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search badge handbook..." className="w-full bg-transparent py-2 font-bold outline-none" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBadges.map((badge) => <BadgeCard key={badge.id} badge={badge} earned={false} showDescription />)}
            </div>
          </section>
        )}

        {view === "leaderboard" && (
          <HandbookCard>
            <h2 className="mb-4 text-3xl font-black">Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.map((person, index) => (
                <div key={person.id} className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-2xl border-2 border-neutral-950 bg-white p-3">
                  <div className="text-2xl font-black">#{index + 1}</div>
                  <div>
                    <div className="text-lg font-black">{person.name}</div>
                    <div className="h-3 overflow-hidden rounded-full border border-neutral-950 bg-[#f5f0df]"><div className="h-full bg-[#d7e342]" style={{ width: `${(person.earned.length / badges.length) * 100}%` }} /></div>
                  </div>
                  <div className="rounded-xl bg-[#f7c62f] px-3 py-2 font-black">{person.earned.length}</div>
                </div>
              ))}
            </div>
          </HandbookCard>
        )}

        {view === "trips" && (
          <section className="grid gap-5">
            {trips.map((trip) => {
              const awards = attendees.flatMap((person) => person.earned.filter((entry) => entry.tripId === trip.id).map((entry) => ({ person, badge: getBadge(entry.badgeId) })));
              return (
                <HandbookCard key={trip.id}>
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h2 className="text-2xl font-black">{trip.name}</h2>
                      <p className="flex items-center gap-2 text-neutral-600"><MapPin className="h-4 w-4" /> {trip.location} • {formatDate(trip.date)}</p>
                    </div>
                    <div className="rounded-2xl border-2 border-neutral-950 bg-[#f7c62f] px-4 py-2 text-sm font-black">{awards.length} badges awarded</div>
                  </div>
                  {awards.length ? (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {awards.map(({ person, badge }) => (
                        <div key={`${person.id}-${badge.id}`} className="flex items-center gap-3 rounded-2xl border-2 border-neutral-950 bg-white p-3">
                          <BadgeImage badge={badge} size="small" />
                          <div><div className="font-black">{badge.title}</div><div className="text-sm text-neutral-600">Awarded to {person.name}</div></div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="rounded-2xl border-2 border-dashed border-neutral-400 bg-white p-4 text-neutral-600">No badges logged for this trip yet. Suspicious.</p>}
                </HandbookCard>
              );
            })}
          </section>
        )}

        {view === "photos" && (
          <section className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {photos.map((photo) => {
                const trip = getTrip(photo.tripId);
                return (
                  <HandbookCard key={photo.id}>
                    <div className="flex aspect-[4/3] items-center justify-center rounded-3xl border-4 border-dashed border-neutral-950 bg-[#fff8df]"><Camera className="h-16 w-16 text-neutral-500" /></div>
                    <h2 className="mt-4 text-xl font-black">{photo.title}</h2>
                    <p className="text-sm font-bold text-[#0b5fa5]">{trip?.name}</p>
                    <p className="mt-2 text-neutral-600">{photo.caption}</p>
                  </HandbookCard>
                );
              })}
            </div>
            <HandbookCard>
              <h2 className="text-2xl font-black">Photo uploads</h2>
              <p className="mt-2 text-neutral-700">A simple Netlify archive can display photos, but friend uploads need extra storage. Good options: Netlify Forms for submissions, Cloudinary for image storage, or a shared Google Drive folder linked here.</p>
              <Button className="mt-4 rounded-2xl border-2 border-neutral-950 bg-[#d7e342] px-5 py-6 font-black text-neutral-950 hover:bg-[#c6d42f]">Submit photo placeholder</Button>
            </HandbookCard>
          </section>
        )}

        {view === "years" && (
          <section className="grid gap-5">
            {yearlySummaries.map(([year, summary]) => (
              <HandbookCard key={year}>
                <h2 className="text-3xl font-black">{year}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-3"><MiniStat label="Trips" value={summary.trips.length} /><MiniStat label="Badges awarded" value={summary.awards.length} /><MiniStat label="Most decorated" value={summary.awards[0]?.person.name || "Pending"} /></div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{summary.trips.map((trip) => <div key={trip.id} className="rounded-2xl border-2 border-neutral-950 bg-white p-4"><div className="font-black">{trip.name}</div><div className="text-sm text-neutral-600">{formatDate(trip.date)}</div></div>)}</div>
              </HandbookCard>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

function BadgeCard({ badge, earned, trip, compact = false, showDescription = false }) {
  return (
    <motion.article initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border-4 border-neutral-950 p-4 shadow-[5px_5px_0_#111] ${earned || showDescription ? "bg-[#f7c62f]" : "bg-neutral-200 opacity-45"}`}>
      <BadgeImage badge={badge} size={compact ? "medium" : "large"} />
      <h3 className="mt-3 text-center text-base font-black">{badge.title}</h3>
      {showDescription ? <p className="mt-2 text-center text-sm text-neutral-600">{badge.description}</p> : <p className="mt-1 text-center text-sm text-neutral-600">{earned ? `Earned at ${trip?.name}` : "Not yet earned"}</p>}
    </motion.article>
  );
}

function BadgeImage({ badge, size = "medium" }) {
  const sizeClass = size === "small" ? "h-14 w-14" : size === "large" ? "h-44 w-44" : "h-28 w-28";
  if (badge.image) return <img src={badge.image} alt={badge.title} className={`mx-auto rounded-full object-contain ${sizeClass}`} />;
  return <div className={`mx-auto flex items-center justify-center rounded-full border-4 border-neutral-950 bg-[#f7c62f] text-center text-xs font-black ${sizeClass}`}><Tent className="h-8 w-8" /></div>;
}

function HandbookCard({ children }) {
  return <Card className="rounded-[2rem] border-4 border-neutral-950 bg-[#fff8df] shadow-[8px_8px_0_#111]"><CardContent className="p-5 sm:p-6">{children}</CardContent></Card>;
}

function StatCard({ icon, label, value }) {
  return <Card className="rounded-3xl border-4 border-neutral-950 bg-white shadow-[5px_5px_0_#111]"><CardContent className="flex items-center gap-4 p-4"><div className="rounded-2xl border-2 border-neutral-950 bg-[#d7e342] p-3 [&_svg]:h-6 [&_svg]:w-6">{icon}</div><div><div className="text-2xl font-black">{value}</div><div className="text-sm font-bold text-neutral-600">{label}</div></div></CardContent></Card>;
}

function MiniStat({ label, value }) {
  return <div className="rounded-2xl border-2 border-neutral-950 bg-white p-4"><div className="text-sm font-black uppercase tracking-wide text-neutral-500">{label}</div><div className="mt-1 text-xl font-black">{value}</div></div>;
}

function TabButton({ active, onClick, children }) {
  return <button onClick={onClick} className={`rounded-2xl border-4 border-neutral-950 px-4 py-3 text-sm font-black transition ${active ? "bg-neutral-950 text-white" : "bg-white text-neutral-950 shadow-[4px_4px_0_#111] hover:bg-[#fff8df]"}`}>{children}</button>;
}
