"use server";
import { buildUrl } from "./urlBuilder";
/**
 * Makes a GET request to an API endpoint
 *
 * @param {string} endpoint - The API endpoint to call
 * @param {string} apiVersion - Optional API version
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - JSON response or text content
 */
export async function getApi(endpoint, apiVersion = "", options = {}) {
  const url = buildUrl(endpoint, apiVersion);

  try {
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 3600 },
      ...options,
    });
    console.log("response.ok", response.ok);
    if (!response.ok) {
      const errorText = await response.text();
      throw {
        status: response.status,
        message: `API Error: ${response.status} ${response.statusText}`,
        details: errorText,
      };
    }

    // Handle different response types
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
  }
}
