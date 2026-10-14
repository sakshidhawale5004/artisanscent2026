import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (
        path.includes("dashboard") ||
        path.includes("crm") ||
        path.includes("admin") ||
        path.endsWith(".php")
      ) {
        window.location.replace("/admin");
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved to our new commerce hub.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1b5e3f] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#164a31]"
          >
            Go home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-full border border-[#1b5e3f]/40 bg-white px-5 py-2 text-sm font-medium text-[#1b5e3f] transition-colors hover:bg-[#f2efe9]"
          >
            Explore Fragrances →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  ssr: false,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Artisan Scent — Premium Fragrances & Essential Oils" },
      {
        name: "description",
        content: "Artisan Scent. A collection of expressive perfumes and considered daily rituals.",
      },
      { property: "og:title", content: "Artisan Scent — Premium Fragrances & Essential Oils" },
      {
        property: "og:description",
        content: "A collection of expressive perfumes and considered daily rituals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const SELECTORS = ".reveal-on-scroll, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right";
    const UNREVEALED_SELECTORS =
      ".reveal-on-scroll:not(.is-revealed), .reveal-fade:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-left:not(.is-revealed), .reveal-right:not(.is-revealed)";

    // Respect user's motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(SELECTORS).forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      },
    );

    const observePending = () => {
      const pending = document.querySelectorAll(UNREVEALED_SELECTORS);
      pending.forEach((el) => observer.observe(el));
    };

    // Run observation immediately
    observePending();

    // Re-check after a tick to catch any layout changes or lazily loaded elements
    const rafId = requestAnimationFrame(() => {
      observePending();
    });

    // Also observe new elements mounted during tab switches or dynamic DOM updates
    const mutationObserver = new MutationObserver(() => {
      observePending();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}





