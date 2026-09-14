# SEO Meta Tags Reference — rest

## Essential Meta Tags (add to index.html <head>)

```html
<!-- Primary Meta Tags -->
<title>Rest - Quality You Can Feel</title>
<meta name="title" content="Rest - Quality You Can Feel" />
<meta
  name="description"
  content="A modern, professional website that presents your brand with clarity, speed, and polish — built to convert."
/>
<meta
  name="keywords"
  content="professional website, business website, modern design, fast, reliable"
/>
<meta name="robots" content="index, follow" />
<meta name="language" content="English" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href="https://www.rest.com" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.rest.com" />
<meta property="og:title" content="Rest - Quality You Can Feel" />
<meta
  property="og:description"
  content="Professional, fast, and built to turn visitors into customers."
/>
<meta property="og:image" content="https://www.rest.com/og-image.jpg" />

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://www.rest.com" />
<meta property="twitter:title" content="Rest - Quality You Can Feel" />
<meta
  property="twitter:description"
  content="Professional, fast, and built to turn visitors into customers."
/>
<meta property="twitter:image" content="https://www.rest.com/twitter-image.jpg" />

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Rest",
    "url": "https://www.rest.com",
    "description": "Professional, fast, and built to turn visitors into customers.",
    "foundingDate": "2026",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Urdu"]
    },
    "sameAs": [
      "https://www.facebook.com/rest",
      "https://www.instagram.com/rest",
      "https://twitter.com/rest"
    ]
  }
</script>
```

## Multilingual (hreflang) — Add if i18n enabled

```html
<link rel="alternate" hreflang="en" href="https://www.rest.com/" />
<link rel="alternate" hreflang="ur" href="https://www.rest.com/ur/" />
<link rel="alternate" hreflang="ar" href="https://www.rest.com/ar/" />
<link rel="alternate" hreflang="x-default" href="https://www.rest.com/" />
```

## PWA Meta Tags — Add if PWA enabled

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#0d9488" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Rest" />
```
