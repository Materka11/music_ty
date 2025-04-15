const DEEZER_API_URL = "https://api.deezer.com";

export const getDeezerSearchResults = async ({
  q,
}: GetDeezerSearchResultsParams) => {
  try {
    const url = `${DEEZER_API_URL}/search?q=${q}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "Error fetching Deezer search results:",
        response.statusText
      );
    }

    const data: DeezerSearchResult = await response.json();

    // if (data.error) {
    //   console.error("Error fetching Deezer search results:", data.error);
    // }

    return data;
  } catch (error) {
    console.error("Error fetching Deezer search results:", error);
    throw error;
  }
};
