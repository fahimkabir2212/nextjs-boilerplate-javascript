"use server";

import { buildUrl } from "./urlBuilder";

/**
 * Makes a GET request to an API endpoint
 *
 * @param {string} url - The API url to call
 * @param {Object} options - Additional fetch options
 * @param {int} revalidateTime - Next Cache revalidation time
 * @returns {Promise<any>} - JSON response or text content
 */
async function get(url, options, revalidateTime) {
  try {
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: revalidateTime },
      ...options,
    });
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

export async function getPublic(endpoint, apiVersion = "") {
  const url = buildUrl(endpoint, apiVersion);
  return get(url, {}, 3600);
}

export async function getPrivate(endpoint, apiVersion = "") {
  const url = buildUrl(endpoint, apiVersion);

  const token = process.env.TEST_ACCESS_TOKEN;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  });

  return get(
    url,
    {
      headers,
    },
    3600
  );
}
