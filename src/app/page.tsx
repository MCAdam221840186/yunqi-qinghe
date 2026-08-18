"use client";

import { RightCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-orb landing-orb-top" aria-hidden="true" />
      <div className="landing-orb landing-orb-bottom" aria-hidden="true" />

      <section className="landing-content" aria-labelledby="landing-title">
        <h1 id="landing-title" className="landing-title">
          云启青禾
        </h1>
        <p className="landing-subtitle">记录每一株幼苗的成长故事</p>
        <Link className="landing-cta" href="/diaries">
          <RightCircleOutlined aria-hidden="true" />
          <span>进入日记</span>
        </Link>
      </section>

      <footer className="landing-footer">云启青禾</footer>
    </main>
  );
}
