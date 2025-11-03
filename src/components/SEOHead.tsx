import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

export const SEOHead = ({
  title = "MUStudy-HUB - Course Materials & Past Exams for Mekelle University",
  description = "Access thousands of course materials, lecture notes, past exam papers, and study resources for all Mekelle University departments. By students, for students.",
  image = "/og-image.jpg",
  type = "website",
  article,
}: SEOHeadProps) => {
  const location = useLocation();
  const siteUrl = window.location.origin;
  const currentUrl = `${siteUrl}${location.pathname}`;
  const fullTitle = title.includes("MUStudy-HUB") ? title : `${title} | MUStudy-HUB`;

  // JSON-LD structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "MUStudy-HUB",
    description:
      "Course materials platform for Mekelle University students providing access to study materials, past exams, and educational resources.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Add your social media profiles here
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mekelle",
      addressCountry: "ET",
    },
  };

  // JSON-LD for website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MUStudy-HUB",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // JSON-LD for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="MUStudy-HUB" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific OG tags */}
      {type === "article" && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags &&
            article.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="MUStudy-HUB" />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
    </Helmet>
  );
};
