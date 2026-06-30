export const estimatorConfig = {
  website: {
    base: 35000,
    perPage: 3500,
    minPages: 5,
    maxPages: 40,
    priceBufferPct: 0.2,
    features: {
      seo: { label: "SEO setup + content guidance", price: 8000 },
      ecommerce: { label: "E-commerce (catalog + checkout)", price: 22000 },
      booking: { label: "Booking/appointment flow", price: 14000 },
      multilingual: { label: "Multilingual setup", price: 12000 },
      crm: { label: "CRM/lead capture integration", price: 9000 },
    },
  },
  dormitory: {
    base: 80000,
    priceBufferPct: 0.2,
    roomTiers: [
      { upTo: 30, add: 0 },
      { upTo: 80, add: 20000 },
      { upTo: 150, add: 40000 },
      { upTo: 300, add: 65000 },
    ],
    modules: {
      billing: { label: "Automated billing + invoices", price: 18000 },
      payments: { label: "Online payment integration", price: 22000 },
      maintenance: { label: "Maintenance ticket workflow", price: 12000 },
      access: { label: "Access control + keycard sync", price: 16000 },
      reporting: { label: "Executive reporting pack", price: 14000 },
    },
  },
  company: {
    base: 25000,
    priceBufferPct: 0.2,
    addons: {
      vat: { label: "VAT registration + tax setup", price: 9000 },
      accounting: { label: "Accounting setup + bookkeeping guidance", price: 15000 },
      contracts: { label: "Starter contract templates pack", price: 8000 },
    },
  },
  analytics: {
    base: 25000,
    perChannel: 7000,
    minChannels: 1,
    maxChannels: 8,
    priceBufferPct: 0.25,
    reportingFrequency: {
      monthly: { label: "Monthly reporting", price: 0 },
      biweekly: { label: "Bi-weekly reporting", price: 6000 },
      weekly: { label: "Weekly reporting", price: 12000 },
    },
    dashboards: {
      none: { label: "No dashboard", price: 0 },
      basic: { label: "Executive dashboard (basic)", price: 8000 },
      advanced: { label: "Live dashboard + alerts", price: 16000 },
    },
  },
};

export type EstimatorService = keyof typeof estimatorConfig;
