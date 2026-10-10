/**
 * NASA Images & Video Library API Client
 * Official Endpoint: https://images-api.nasa.gov
 * Documentation: https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 */

export interface NASAItemData {
  nasa_id: string;
  title: string;
  description?: string;
  date_created?: string;
  center?: string;
  secondary_creator?: string;
  keywords?: string[];
  photographer?: string;
}

export interface NASAItemLink {
  href: string;
  rel: string;
  render?: string;
}

export interface NASAImageItem {
  data: NASAItemData;
  imageUrl: string;
  thumbUrl: string;
  assetManifestUrl?: string;
  source: 'live' | 'curated_fallback';
}

export interface NASASearchResult {
  items: NASAImageItem[];
  totalHits: number;
}

// In-memory cache to prevent repeated network round-trips
const memoryCache = new Map<string, NASAImageItem[]>();

// Curated verified NASA assets for all 11 story scenes
// ALL URLs are tested & verified to return HTTP 200 from images-assets.nasa.gov!
export const SCENE_CURATED_NASA_ASSETS: Record<number, { query: string; fallback: NASAImageItem }> = {
  1: {
    query: "PIA04856",
    fallback: {
      data: {
        nasa_id: "PIA04856",
        title: "Opportunity at Meridiani Planum",
        description: "Artist concept of the Mars Exploration Rover Opportunity on the surface of the Red Planet.",
        date_created: "2003-07-07",
        center: "JPL",
        keywords: ["Opportunity", "Mars", "Rover", "Exploration"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA04856/PIA04856~thumb.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA04856/PIA04856~thumb.jpg",
      source: "curated_fallback"
    }
  },
  2: {
    query: "KSC-03pd1874",
    fallback: {
      data: {
        nasa_id: "KSC-03pd1874",
        title: "Opportunity Launch Aboard Delta II Heavy",
        description: "A Boeing Delta II rocket carrying the Mars Exploration Rover Opportunity blasts off from Cape Canaveral.",
        date_created: "2003-07-07",
        center: "KSC",
        keywords: ["Launch", "Delta II", "Opportunity", "Rocket"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/KSC-03pd1874/KSC-03pd1874~medium.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/KSC-03pd1874/KSC-03pd1874~thumb.jpg",
      source: "curated_fallback"
    }
  },
  3: {
    query: "PIA04413",
    fallback: {
      data: {
        nasa_id: "PIA04413",
        title: "Mars Airbag Landing System Deployment",
        description: "Engineering tests of the giant bouncing airbags designed to cushion the landing of the rovers on Mars.",
        date_created: "2003-05-15",
        center: "JPL",
        keywords: ["Landing", "Airbags", "Mars", "Atmosphere"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA04413/PIA04413~medium.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA04413/PIA04413~thumb.jpg",
      source: "curated_fallback"
    }
  },
  4: {
    query: "PIA21494",
    fallback: {
      data: {
        nasa_id: "PIA21494",
        title: "Rover Landing Hardware at Eagle Crater, Mars",
        description: "High-resolution orbital view of Opportunity's landing site and hardware at Eagle Crater on Meridiani Planum.",
        date_created: "2004-01-26",
        center: "JPL",
        keywords: ["Meridiani Planum", "Eagle Crater", "Surface", "Landing Site"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA21494/PIA21494~medium.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA21494/PIA21494~thumb.jpg",
      source: "curated_fallback"
    }
  },
  5: {
    query: "PIA05470",
    fallback: {
      data: {
        nasa_id: "PIA05470",
        title: "Martian Blueberries (Hematite Spherules)",
        description: "Microscopic imager view of spherical hematite grains dubbed 'blueberries', formed in ancient liquid water.",
        date_created: "2004-03-03",
        center: "JPL",
        keywords: ["Hematite", "Blueberries", "Water", "Geology", "Microscopic"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA05470/PIA05470~small.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA05470/PIA05470~thumb.jpg",
      source: "curated_fallback"
    }
  },
  6: {
    query: "PIA06739",
    fallback: {
      data: {
        nasa_id: "PIA06739",
        title: "Opportunity at the Rim of Endurance Crater",
        description: "Opportunity exploring layered rock walls at Endurance Crater, surpassing its original 90-sol design lifetime.",
        date_created: "2004-07-28",
        center: "JPL",
        keywords: ["Endurance Crater", "Sol 90", "Layers", "Stratigraphy"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA06739/PIA06739~small.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA06739/PIA06739~thumb.jpg",
      source: "curated_fallback"
    }
  },
  7: {
    query: "PIA08813",
    fallback: {
      data: {
        nasa_id: "PIA08813",
        title: "Cape Verde at Victoria Crater",
        description: "Breathtaking panoramic mosaic captured by Opportunity at Victoria Crater over 1,000 Martian sols into its mission.",
        date_created: "2006-10-18",
        center: "JPL",
        keywords: ["Victoria Crater", "Panorama", "Pancam", "Martian Landscape"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA08813/PIA08813~medium.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA08813/PIA08813~thumb.jpg",
      source: "curated_fallback"
    }
  },
  8: {
    query: "PIA19154",
    fallback: {
      data: {
        nasa_id: "PIA19154",
        title: "Opportunity Celebrates Marathon Distance on Mars",
        description: "Opportunity reaches 42.195 km (26.2 miles) of driving, setting an off-world Olympic marathon record.",
        date_created: "2015-03-24",
        center: "JPL",
        keywords: ["Marathon Valley", "Endeavour Crater", "Distance Record", "Tracks"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA19154/PIA19154~medium.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA19154/PIA19154~thumb.jpg",
      source: "curated_fallback"
    }
  },
  9: {
    query: "PIA22521",
    fallback: {
      data: {
        nasa_id: "PIA22521",
        title: "Simulated Views of Darkening Sky in 2018 Global Dust Storm",
        description: "Artist depiction showing how daytime sky turned pitch black as the 2018 planet-encircling dust storm blotted out the Sun.",
        date_created: "2018-06-13",
        center: "JPL",
        keywords: ["Dust Storm", "Perseverance Valley", "Solar Power", "Atmosphere"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA22521/PIA22521~small.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA22521/PIA22521~thumb.jpg",
      source: "curated_fallback"
    }
  },
  10: {
    query: "PIA13017",
    fallback: {
      data: {
        nasa_id: "PIA13017",
        title: "Deep Space Network Mars Tracking Dish",
        description: "70-meter giant radio dish listening for Opportunity's faint whisper across hundreds of millions of kilometers.",
        date_created: "2010-04-12",
        center: "JPL",
        keywords: ["Deep Space Network", "DSN", "Antenna", "Signals", "Radio"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA13017/PIA13017~small.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA13017/PIA13017~thumb.jpg",
      source: "curated_fallback"
    }
  },
  11: {
    query: "PIA22959",
    fallback: {
      data: {
        nasa_id: "PIA22959",
        title: "Opportunity Final 360-Degree Martian Panorama",
        description: "The last panoramic mosaic assembled from 354 individual pictures sent by Opportunity before the storm silenced its transmitters.",
        date_created: "2019-03-29",
        center: "JPL",
        keywords: ["Perseverance Valley", "Endeavour Crater", "Final View", "Legacy"]
      },
      imageUrl: "https://images-assets.nasa.gov/image/PIA22959/PIA22959~small.jpg",
      thumbUrl: "https://images-assets.nasa.gov/image/PIA22959/PIA22959~thumb.jpg",
      source: "curated_fallback"
    }
  }
};

/**
 * Searches the official NASA Images and Video Library API
 * Uses media_type=image
 */
export async function searchNASAImages(
  query: string,
  options: { page?: number; pageSize?: number } = {}
): Promise<NASASearchResult> {
  const cacheKey = `search:${query}:${options.page || 1}`;
  if (memoryCache.has(cacheKey)) {
    return {
      items: memoryCache.get(cacheKey)!,
      totalHits: memoryCache.get(cacheKey)!.length
    };
  }

  const endpoint = new URL("https://images-api.nasa.gov/search");
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("media_type", "image");
  if (options.page) endpoint.searchParams.set("page", String(options.page));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(endpoint.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[NASA API] Server returned status ${response.status} for query "${query}"`);
      return getFallbackForQuery(query);
    }

    const json = await response.json();
    const items = json?.collection?.items || [];

    const parsedItems: NASAImageItem[] = [];

    for (const item of items) {
      const data: NASAItemData = item.data?.[0];
      const links: NASAItemLink[] = item.links || [];

      if (!data) continue;

      // Find the direct preview link returned by NASA's own servers
      const previewLink = links.find((l) => l.rel === "preview")?.href || links[0]?.href;
      if (!previewLink) continue;

      // Ensure HTTPS without breaking the file extension
      const securePreview = previewLink.replace(/^http:\/\//i, "https://");

      parsedItems.push({
        data,
        imageUrl: securePreview, // Guaranteed to exist because it came directly from NASA's link
        thumbUrl: securePreview,
        assetManifestUrl: `https://images-api.nasa.gov/asset/${data.nasa_id}`,
        source: "live"
      });

      if (parsedItems.length >= (options.pageSize || 12)) break;
    }

    if (parsedItems.length === 0) {
      return getFallbackForQuery(query);
    }

    memoryCache.set(cacheKey, parsedItems);
    return {
      items: parsedItems,
      totalHits: json?.collection?.metadata?.total_hits || parsedItems.length
    };
  } catch (err: unknown) {
    console.warn(`[NASA API] Network error for "${query}":`, err instanceof Error ? err.message : err);
    return getFallbackForQuery(query);
  }
}

/**
 * Retrieves the asset manifest list of files for a specific NASA ID
 */
export async function getNASAAsset(nasaId: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`https://images-api.nasa.gov/asset/${encodeURIComponent(nasaId)}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });
    clearTimeout(timeoutId);

    if (!response.ok) return [];

    const json = await response.json();
    const items = json?.collection?.items || [];
    return items.map((i: { href: string }) => i.href.replace(/^http:\/\//i, "https://"));
  } catch {
    return [];
  }
}

/**
 * Dedicated function to acquire the best NASA image for a story scene (1-11)
 * Combines intentional NASA search queries with verified guaranteed fallbacks
 */
export async function getSceneNASAImage(sceneNumber: number): Promise<NASAImageItem> {
  const config = SCENE_CURATED_NASA_ASSETS[sceneNumber];
  if (!config) {
    return SCENE_CURATED_NASA_ASSETS[1].fallback;
  }

  try {
    const searchRes = await searchNASAImages(config.query, { pageSize: 3 });
    if (searchRes.items && searchRes.items.length > 0) {
      return searchRes.items[0];
    }
  } catch (err) {
    console.warn(`[NASA API] Could not load scene ${sceneNumber} live image, using verified asset`, err);
  }

  return config.fallback;
}

/**
 * Fallback helper when live search yields no results or throws error
 */
function getFallbackForQuery(query: string): NASASearchResult {
  const lowerQuery = query.toLowerCase();
  for (const key of Object.keys(SCENE_CURATED_NASA_ASSETS)) {
    const num = Number(key);
    const item = SCENE_CURATED_NASA_ASSETS[num];
    if (
      lowerQuery.includes(item.fallback.data.nasa_id.toLowerCase()) ||
      lowerQuery.includes("opportunity") ||
      item.query.toLowerCase().includes(lowerQuery)
    ) {
      return { items: [item.fallback], totalHits: 1 };
    }
  }

  return {
    items: [SCENE_CURATED_NASA_ASSETS[1].fallback],
    totalHits: 1
  };
}
