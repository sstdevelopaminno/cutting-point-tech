import Script from "next/script";
import GaPageViewTracker from "@/components/GaPageViewTracker";
import CoreWebVitalsTracker from "@/components/CoreWebVitalsTracker";

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
const hasGa4Id = /^G-[A-Z0-9]+$/i.test(GA4_ID);

export default function Analytics() {
  if (process.env.NODE_ENV !== "production" || !hasGa4Id) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}', { anonymize_ip: true, send_page_view: false });`}
      </Script>
      <GaPageViewTracker gaId={GA4_ID} />
      <CoreWebVitalsTracker />
    </>
  );
}
