import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEOHead({
  title = 'BESSEcho - Battery Energy Storage Systems Technology Blog',
  description = 'Master BESS technology with expert insights, cutting-edge research, and practical solutions for the renewable energy revolution.',
  keywords = 'BESS, battery energy storage, renewable energy, grid storage, lithium-ion, energy management',
  image = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630',
  url = 'https://bessecho.com',
  type = 'website',
  author,
  publishedTime,
  modifiedTime
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('article:')) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'BESSEcho');
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Article-specific tags
    if (type === 'article') {
      if (author) updateMetaTag('article:author', author);
      if (publishedTime) updateMetaTag('article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
      updateMetaTag('article:section', 'Technology');
      updateMetaTag('article:tag', keywords);
    }

    // Schema.org structured data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": type === 'article' ? 'Article' : 'WebSite',
      "name": title,
      "description": description,
      "url": url,
      "image": image,
      ...(type === 'article' && {
        "author": {
          "@type": "Person",
          "name": author || "BESSEcho Editorial Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BESSEcho",
          "logo": {
            "@type": "ImageObject",
            "url": `${url}/logo.png`
          }
        },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      })
    };

    // Update JSON-LD structured data
    let jsonLdScript = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime]);

  return null;
}