import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.invincioservices.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logo.png`;

type Breadcrumb = { name: string; path: string };

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "course";
  keywords?: string;
  noindex?: boolean;
  breadcrumbs?: Breadcrumb[];
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords,
  noindex = false,
  breadcrumbs,
  jsonLd,
}: SEOProps) => {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  const breadcrumbLd = breadcrumbs && breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path.startsWith("/") ? b.path : `/${b.path}`}`,
        })),
      }
    : null;

  const extraLd = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1"
        }
      />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Invincio Services" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@InvincioSSB" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {breadcrumbLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      )}
      {extraLd.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
