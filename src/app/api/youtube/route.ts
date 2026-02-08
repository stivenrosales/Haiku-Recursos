import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

const CHANNEL_ID = 'UCzcJvlXLGtg09CaIehpDsMw';
const API_BASE = 'https://www.googleapis.com/youtube/v3';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  link: string;
}

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!API_KEY) {
    return NextResponse.json({ videos: [] }, { status: 200 });
  }

  try {
    // Step 1: Search for medium (4-20min) and long (>20min) videos, ordered by viewCount
    const [mediumRes, longRes] = await Promise.all([
      fetch(
        `${API_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=viewCount&videoDuration=medium&maxResults=15&key=${API_KEY}`,
        { next: { revalidate: 3600 } }
      ),
      fetch(
        `${API_BASE}/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=viewCount&videoDuration=long&maxResults=15&key=${API_KEY}`,
        { next: { revalidate: 3600 } }
      ),
    ]);

    const mediumData = mediumRes.ok ? await mediumRes.json() : { items: [] };
    const longData = longRes.ok ? await longRes.json() : { items: [] };

    const allItems = [...(mediumData.items || []), ...(longData.items || [])];
    const videoIds = allItems
      .map((item: { id?: { videoId?: string } }) => item.id?.videoId)
      .filter(Boolean)
      .join(',');

    if (!videoIds) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    // Step 2: Get video details (duration + view count) to filter out Shorts
    const detailsUrl = `${API_BASE}/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${API_KEY}`;
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: 3600 } });

    if (!detailsRes.ok) {
      return NextResponse.json({ videos: [] }, { status: 200 });
    }

    const detailsData = await detailsRes.json();

    const videos: YouTubeVideo[] = detailsData.items
      ?.filter((video: { contentDetails?: { duration?: string } }) => {
        // Filter out Shorts and very short videos (under 3 minutes)
        const duration = video.contentDetails?.duration || '';
        const seconds = parseDuration(duration);
        return seconds >= 180;
      })
      .map((video: {
        id: string;
        snippet?: { title?: string; publishedAt?: string; thumbnails?: { maxres?: { url?: string }; high?: { url?: string } } };
        statistics?: { viewCount?: string };
      }) => ({
        id: video.id,
        title: video.snippet?.title || '',
        thumbnail:
          video.snippet?.thumbnails?.maxres?.url ||
          video.snippet?.thumbnails?.high?.url ||
          `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
        publishedAt: video.snippet?.publishedAt || '',
        viewCount: parseInt(video.statistics?.viewCount || '0', 10),
        link: `https://www.youtube.com/watch?v=${video.id}`,
      }))
      // Sort by view count descending (most viewed first)
      .sort((a: YouTubeVideo, b: YouTubeVideo) => b.viewCount - a.viewCount) || [];

    return NextResponse.json(
      { videos },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch {
    return NextResponse.json({ videos: [] }, { status: 200 });
  }
}

/** Parse ISO 8601 duration (PT1H2M3S) to total seconds */
function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}
