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
  educationalMaterial?: {
    name: string;
    description: string;
    courseCode: string;
    department: string;
    fileType: string;
    fileSize: string;
    uploadDate: string;
    author: string;
    ratingValue?: number;
    ratingCount?: number;
    downloadCount?: number;
    viewCount?: number;
    keywords?: string[];
  };
}

export const SEOHead = ({
  title = "MUStudy-HUB - Course Materials & Past Exams for Mekelle University",
  description = "Access thousands of course materials, lecture notes, past exam papers, and study resources for all Mekelle University departments. By students, for students.",
  image = "/og-image.jpg",
  type = "website",
  article,
  educationalMaterial,
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

  // JSON-LD for educational material (LearningResource)
  const educationalMaterialSchema = educationalMaterial
    ? {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: educationalMaterial.name,
        description: educationalMaterial.description,
        learningResourceType: "Course Material",
        educationalLevel: "University",
        about: {
          "@type": "Course",
          name: educationalMaterial.courseCode,
          courseCode: educationalMaterial.courseCode,
          provider: {
            "@type": "EducationalOrganization",
            name: "Mekelle University",
          },
        },
        author: {
          "@type": "Person",
          name: educationalMaterial.author,
        },
        datePublished: educationalMaterial.uploadDate,
        inLanguage: "en",
        keywords: educationalMaterial.keywords?.join(", "),
        encoding: {
          "@type": "MediaObject",
          encodingFormat: educationalMaterial.fileType,
          contentSize: educationalMaterial.fileSize,
        },
        aggregateRating:
          educationalMaterial.ratingValue && educationalMaterial.ratingCount
            ? {
                "@type": "AggregateRating",
                ratingValue: educationalMaterial.ratingValue,
                ratingCount: educationalMaterial.ratingCount,
                bestRating: 5,
                worstRating: 1,
              }
            : undefined,
        interactionStatistic: [
          educationalMaterial.downloadCount
            ? {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/DownloadAction",
                userInteractionCount: educationalMaterial.downloadCount,
              }
            : undefined,
          educationalMaterial.viewCount
            ? {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/ViewAction",
                userInteractionCount: educationalMaterial.viewCount,
              }
            : undefined,
        ].filter(Boolean),
      }
    : null;

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
      <meta name="author" content={educationalMaterial?.author || "MUStudy-HUB"} />

      {/* Educational Material Specific Tags */}
      {educationalMaterial && (
        <>
          <meta name="keywords" content={educationalMaterial.keywords?.join(", ")} />
          <meta name="DC.title" content={educationalMaterial.name} />
          <meta name="DC.creator" content={educationalMaterial.author} />
          <meta name="DC.subject" content={educationalMaterial.courseCode} />
          <meta name="DC.description" content={educationalMaterial.description} />
          <meta name="DC.publisher" content="MUStudy-HUB" />
          <meta name="DC.date" content={educationalMaterial.uploadDate} />
          <meta name="DC.type" content="Text" />
          <meta name="DC.format" content={educationalMaterial.fileType} />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {educationalMaterialSchema && (
        <script type="application/ld+json">{JSON.stringify(educationalMaterialSchema)}</script>
      )}
    </Helmet>
  );
};
