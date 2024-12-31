const { unstable_cache } = require("next/cache");

const getDailyPrompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store", // No cache storage is used for this request
      });
      // Parsing the response data as JSON
      const data = await res.json();
      return data.slip.advice;
    } catch (error) {
      return {
        success: false,
        data: "what's in your mind today", // Default message if there's an error
      };
    }
  },
  ["daily-prompt"], // Cache key, helps in identifying and invalidating the cache
  {
    // Revalidating the cache every 86400 seconds (24 hours)
    revalidate: 86400,
    tags: ["daily-prompt"], // Cache tag for better cache management
  }
);

export default getDailyPrompt;
