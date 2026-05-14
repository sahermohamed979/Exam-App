import Link from "next/link";
import Image from "next/image";
import { Button } from "@/src/shared/components/ui/button";
import { ArrowUpRight, Compass, Home, LogIn } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-[linear-gradient(160deg,oklch(0.99_0.012_240)_0%,oklch(0.965_0.02_250)_50%,oklch(0.94_0.03_265)_100%)] px-6 py-10 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.22),transparent_40%),radial-gradient(circle_at_70%_85%,rgba(37,99,235,0.18),transparent_44%)]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-slate-200/70 bg-white/85 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.42)] backdrop-blur-xl lg:grid-cols-[1.2fr_0.8fr]">
        <div className="flex flex-col justify-between gap-10 p-7 sm:p-10 lg:p-14">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
              <Compass className="size-3.5 text-emerald-600" />
              Route Lost
            </div>

            <div className="space-y-5">
              <p className="font-heading text-7xl font-semibold leading-none tracking-tight text-slate-900 sm:text-8xl">
                404
              </p>
              <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                This page took a wrong turn.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                The destination may have changed, the link may be outdated, or
                access could require a fresh sign-in. Pick a route below and
                keep moving.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Fastest route
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Jump straight back to your main page.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Need access?
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Sign in again to restore protected routes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
            >
              <Link href="/">
                <Home className="size-4" />
                Go to home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="gap-2 border-slate-300 text-slate-800"
            >
              <Link href="/login">
                <LogIn className="size-4" />
                Login again
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="gap-2 text-slate-700 hover:bg-slate-100"
            >
              <Link href="/signup">
                Create account
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        <aside className="relative min-h-80 border-t border-slate-200/80 bg-[linear-gradient(180deg,rgba(240,249,255,0.8)_0%,rgba(236,253,245,0.72)_100%)] p-8 sm:p-10 lg:min-h-full lg:border-l lg:border-t-0 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.5)_0%,transparent_45%,rgba(255,255,255,0.45)_100%)]" />
          <div className="relative flex h-full flex-col justify-between gap-8 animate-in fade-in slide-in-from-right-6 duration-700 delay-150">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Navigation Tip
              </p>
              <p className="text-xl font-semibold text-slate-900 sm:text-2xl">
                Use the menu or URL check to verify your destination.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-xs items-center justify-center">
              <div className="absolute h-48 w-48 rounded-full bg-emerald-300/50 blur-3xl" />
              <div className="relative rounded-[1.8rem] border border-white/70 bg-white/90 p-4 shadow-xl">
                <Image
                  src="/images/eg.png"
                  alt="Page not found"
                  width={260}
                  height={260}
                  className="h-44 w-44 rounded-2xl object-cover sm:h-52 sm:w-52"
                  priority
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/85 p-4">
              <p className="text-sm font-medium text-slate-900">
                Requested path unavailable
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                If this keeps happening, check route naming or permissions for
                this section.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
