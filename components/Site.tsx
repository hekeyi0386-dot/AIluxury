"use client";

import { useCallback, useState } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import Instrument from "./Instrument";
import Exploration from "./Exploration";
import Pillars from "./Pillars";
import Making from "./Making";
import Collection from "./Collection";
import House from "./House";
import Ownership from "./Ownership";
import Footer from "./Footer";

export default function Site() {
  const [edition, setEdition] = useState("");

  const request = useCallback((id: string) => {
    setEdition(id);
    document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Instrument />
        <Exploration />
        <Pillars />
        <Making />
        <Collection onRequest={request} />
        <House />
        <Ownership edition={edition} />
      </main>
      <Footer />
    </>
  );
}
