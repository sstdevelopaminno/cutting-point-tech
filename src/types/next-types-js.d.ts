declare module "next" {
  export type {
    Metadata,
    Viewport,
  } from "next/dist/lib/metadata/types/metadata-interface.js";

  export namespace MetadataRoute {
    type RobotsRule = {
      userAgent?: string | string[];
      allow?: string | string[];
      disallow?: string | string[];
      crawlDelay?: number;
    };

    type Robots = {
      rules?: RobotsRule | RobotsRule[];
      sitemap?: string | string[];
      host?: string;
    };

    type Sitemap = Array<{
      url: string;
      lastModified?: string | Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
      alternates?: {
        languages?: Record<string, string>;
      };
    }>;
  }
}

declare module "next/types.js" {
  export type {
    ResolvingMetadata,
    ResolvingViewport,
  } from "next/dist/lib/metadata/types/metadata-interface.js";
}

declare module "next/link" {
  import type { AnchorHTMLAttributes, ReactNode } from "react";

  type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children?: ReactNode;
    prefetch?: boolean | null;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    locale?: string | false;
  };

  export default function Link(props: LinkProps): ReactNode;
}

declare module "next/image" {
  import type { ImgHTMLAttributes, ReactNode } from "react";

  type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
    src: string;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    priority?: boolean;
    sizes?: string;
    quality?: number | `${number}`;
    unoptimized?: boolean;
    loading?: "lazy" | "eager";
    fetchPriority?: "high" | "low" | "auto";
  };

  export default function Image(props: ImageProps): ReactNode;
}

declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  type Icon = ComponentType<SVGProps<SVGSVGElement>>;

  export const ArrowRight: Icon;
  export const Award: Icon;
  export const BarChart3: Icon;
  export const Bot: Icon;
  export const Briefcase: Icon;
  export const CheckCircle2: Icon;
  export const ChevronDown: Icon;
  export const ClipboardCopy: Icon;
  export const ExternalLink: Icon;
  export const Eye: Icon;
  export const Gauge: Icon;
  export const Globe2: Icon;
  export const Layers: Icon;
  export const LineChart: Icon;
  export const Loader2: Icon;
  export const Mail: Icon;
  export const MapPin: Icon;
  export const Menu: Icon;
  export const MessageSquare: Icon;
  export const MousePointerClick: Icon;
  export const Phone: Icon;
  export const Search: Icon;
  export const ShieldCheck: Icon;
  export const Sparkles: Icon;
  export const Star: Icon;
  export const X: Icon;
  export const XCircle: Icon;
}

declare module "next/navigation" {
  export function useRouter(): {
    push: (href: string) => void;
    replace: (href: string) => void;
    refresh: () => void;
    back: () => void;
    forward: () => void;
    prefetch: (href: string) => void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}

declare module "next/web-vitals" {
  export type NextWebVitalsMetric = {
    id: string;
    name: string;
    startTime: number;
    value: number;
    label?: string;
    rating?: "good" | "needs-improvement" | "poor";
  };
  export function useReportWebVitals(callback: (metric: NextWebVitalsMetric) => void): void;
}

declare module "next/script" {
  import type { ScriptHTMLAttributes, ReactNode } from "react";

  type ScriptProps = ScriptHTMLAttributes<HTMLScriptElement> & {
    id?: string;
    strategy?: "afterInteractive" | "beforeInteractive" | "lazyOnload" | "worker";
  };

  export default function Script(props: ScriptProps): ReactNode;
}

declare module "next/headers" {
  export function cookies(): Promise<{
    get: (name: string) => { value: string } | undefined;
  }>;
  export function headers(): Promise<{
    get: (name: string) => string | null;
  }>;
}

declare module "next/font/google" {
  type FontOptions = {
    subsets?: string[];
    weight?: string | string[];
    variable?: string;
    display?: string;
  };
  type FontResult = {
    className: string;
    variable: string;
    style: Record<string, string>;
  };
  export function Noto_Sans_Thai(options: FontOptions): FontResult;
  export function Noto_Serif_Thai(options: FontOptions): FontResult;
  export function Noto_Sans_Lao(options: FontOptions): FontResult;
  export function Noto_Serif_Lao(options: FontOptions): FontResult;
}

declare module "next/server" {
  export { NextRequest } from "next/dist/server/web/spec-extension/request.js";
  export { NextResponse } from "next/dist/server/web/spec-extension/response.js";
  export { ImageResponse } from "next/dist/server/web/spec-extension/image-response.js";
  export { userAgent, userAgentFromString } from "next/dist/server/web/spec-extension/user-agent.js";
  export { URLPattern } from "next/dist/server/web/spec-extension/url-pattern.js";
  export { after } from "next/dist/server/after.js";
  export { connection } from "next/dist/server/request/connection.js";
}

declare module "next/server.js" {
  export { NextRequest } from "next/dist/server/web/spec-extension/request.js";
  export { NextResponse } from "next/dist/server/web/spec-extension/response.js";
  export { ImageResponse } from "next/dist/server/web/spec-extension/image-response.js";
  export { userAgent, userAgentFromString } from "next/dist/server/web/spec-extension/user-agent.js";
  export { URLPattern } from "next/dist/server/web/spec-extension/url-pattern.js";
  export { after } from "next/dist/server/after.js";
  export { connection } from "next/dist/server/request/connection.js";
}
