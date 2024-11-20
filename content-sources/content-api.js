const fetchData = async ({ "arc-site": arcSite = "ajc", path, id }) => {
  const ttl = 120;

  let requestUri = `https://api.ajc.arcpublishing.com/content/v4/?published=true&website=${arcSite}`;
  requestUri += path ? `&website_url=${path}` : "";
  requestUri += id ? `&_id=${id}` : "";

  try {
    // Make the fetch request
    const response = await fetch(requestUri, {
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
