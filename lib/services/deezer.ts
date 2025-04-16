const DEEZER_API_URL = "https://api.deezer.com";

export const getDeezerSearchResults = async ({
  q,
  type = "track",
}: GetDeezerSearchResultsParams): Promise<DeezerSearchResult> => {
  try {
    const encodedQuery = encodeURIComponent(q);

    const endpoint = `${DEEZER_API_URL}/search/${type}?q=${encodedQuery}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching from ${endpoint}: ${response.statusText}`
      );
    }

    const data = await response.json();

    const formattedData = data.data.map((item: DeezerSearchResultItem) => ({
      ...item,
      type,
    }));

    return {
      data: formattedData,
      total: formattedData.length,
    };
  } catch (error) {
    console.error("Error fetching Deezer search results:", error);
    throw error;
  }
};
