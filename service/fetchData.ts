/**
 * The `fetchMapData` function fetches map data based on a selected token and search address, then sets
 * the retrieved data using a provided callback function.
 * @param {string} selectedToken - The `selectedToken` parameter in the `fetchMapData` function is a
 * string that represents the chain for which you want to fetch map data. It is used in the API request
 * URL to specify the blockchain network for which you are retrieving data.
 * @param {string} searchAddress - The `searchAddress` parameter in the `fetchMapData` function is the
 * address you want to search for in the API. It is used in the API request URL to fetch data related
 * to that specific address.
 * @param setMapData - The `setMapData` parameter in the `fetchMapData` function is a function that
 * takes one argument of type `any` and does not return anything. This function is used to update the
 * map data with the fetched data from the API response.
 */
export async function fetchMapData(
  selectedToken: string,
  searchAddress: string,
  setMapData: (data: Record<string, unknown> | null) => void
) {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
      },
    };

    let apiUrl = "";

    if (selectedToken === "solana") {
      // Use Solana-specific endpoint
      apiUrl = `https://solana-gateway.moralis.io/token/mainnet/${searchAddress}/swaps?order=DESC`;
    } else {
      // Use standard EVM endpoint
      apiUrl = `https://deep-index.moralis.io/api/v2.2/erc20/${searchAddress}/swaps?chain=${selectedToken}&order=DESC`;
    }

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    setMapData(data);
  } catch (e) {
    console.error("Error fetching map data:", e);
    setMapData(null); // Clear mapData in case of an error
  }
}
