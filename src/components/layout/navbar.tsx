"use client";

import { AccountMenu } from "@/components/layout/account-menu";
import { BrowseMegaMenu } from "@/components/layout/browse-mega-menu";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { MobileSettingsPanel } from "@/components/layout/mobile-settings-panel";
import { SearchBar } from "@/components/layout/search-bar";
import { MenuIcon, SettingsIcon } from "@/components/icons";
import { Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileSettingsOpen(false);
    setMobileMenuOpen((v) => !v);
  }

  function toggleMobileSettings() {
    setMobileMenuOpen(false);
    setMobileSettingsOpen((v) => !v);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0c0f]">
      <div className="flex flex-wrap items-center justify-between gap-4 px-sm py-sm md:px-lg lg:grid lg:grid-cols-[auto_1fr_auto]">
        {/* logo + desktop nav */}
        <div className="order-1 flex items-center gap-8">
          <Link
            href="/"
            className="relative flex h-9 w-32 shrink-0 items-center"
            aria-label="Rizwoow"
          >
            <svg
              viewBox="0 0 400 150"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -left-2 top-1/2 h-14 w-auto -translate-y-1/2"
            >
              <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
                .logo-text {
                  font-family: 'Pacifico', cursive;
                  font-size: 60px;
                  fill: #ffffff;
                }
              `}</style>
              <text
                x="200"
                y="90"
                textAnchor="middle"
                className="logo-text"
                transform="rotate(-4 200 90)"
              >
                Rizwoow
              </text>
            </svg>
          </Link>

          <ul className="hidden items-center gap-2 lg:flex">
            <li>
              <Link
                href="/explore"
                className="rounded-full px-4 py-2 text-sm text-foreground/90 transition-colors hover:bg-white/5"
              >
                Explore
              </Link>
            </li>
            <li className="group relative">
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm text-foreground/90 transition-colors group-hover:bg-white/5"
              >
                Browse
              </button>
              <BrowseMegaMenu />
            </li>
          </ul>
        </div>

        {/* search */}
        <div className="order-3 w-full lg:order-2 lg:w-full lg:max-w-md lg:justify-self-center">
          <SearchBar />
        </div>

        {/* right side */}
        <div className="order-2 flex items-center justify-end gap-2 lg:order-3">
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/account/download-history/samples"
              aria-label="Downloaded samples"
              className="flex h-11 w-11 items-center justify-center rounded-3xl bg-surface-2/60 text-foreground/80 transition-colors duration-200 hover:bg-white/10"
            >
              <SettingsIcon width={20} height={20} />
            </Link>
            <Link
              href="/account"
              aria-label="Credits"
              className="flex h-11 w-11 items-center justify-center rounded-3xl bg-surface-2/60 text-xs text-foreground/80 transition-colors duration-200 hover:bg-white/10"
            >
              4
            </Link>
            <div className="group relative">
              <button
                type="button"
                aria-label="Account settings"
                className="flex h-11 w-11 items-center justify-center rounded-3xl bg-surface-2/60 text-foreground/80 transition-colors duration-200 hover:bg-white/10"
              >
                <Settings size={20} strokeWidth={1.6} />
              </button>
              <AccountMenu />
            </div>
          </div>

          {/* mobile settings toggle */}
          <button
            type="button"
            onClick={toggleMobileSettings}
            aria-label="Open settings"
            aria-expanded={mobileSettingsOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center text-foreground/90 lg:hidden"
          >
            {mobileSettingsOpen ? <X size={22} /> : <Settings size={22} strokeWidth={1.6} />}
          </button>

          {/* mobile menu toggle */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center text-foreground/90 lg:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <MobileSettingsPanel
        open={mobileSettingsOpen}
        onClose={() => setMobileSettingsOpen(false)}
      />
    </header>
  );
}

