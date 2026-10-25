"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";

// Curated 3D architectural visualization works for Priyanshi Mathur's portfolio
// Uses authentic local render paths with reliable Unsplash architectural fallbacks.
const WORKS: WorksWheelItem[] = [
  {
    title: "Regency Celebration Hall",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    href: "#project/regency-hall",
  },
  {
    title: "Havelock Island Retreat",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
    href: "#project/havelock-island",
  },
  {
    title: "Goa Villa Master Suite",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    href: "#project/goa-villa",
  },
  {
    title: "Vrindavan Heritage Study",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    href: "#project/vrindavan-3d",
  },
  {
    title: "Manan Residence Gurugram",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    href: "#project/manan-gurugram",
  },
  {
    title: "Arora Luxury Residence",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    href: "#project/arora-residence",
  },
  {
    title: "77 Arvind Gupta Villa",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
    href: "#project/77-arvind-gupta",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Works '26" action="View" />
    </div>
  );
}
