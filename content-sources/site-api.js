const fetchData = async (query = {}) => {
  const ttl = 600;
  const arcSite = query["arc-site"] || "ajc";
  const type = query.type || "navigation";
  const hierarchy = query.hierarchy || "default";
  const section = query.section;

  // Build the endpoint
  const endpoint = `https://api.ajc.arcpublishing.com/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;
  const url = section ? `${endpoint}&_id=${section}` : endpoint;

  try {
    // Make the fetch request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ARC_ACCESS_TOKEN}`,
      },
      next: { revalidate: ttl },
    });

    // Parse JSON response
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
};

export default fetchData;
