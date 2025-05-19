/**
 * Builds a sanitized full URL by combining base URL and endpoint.
 * @param endpoint - The API endpoint (e.g., '/users')
 * @returns The full sanitized URL (e.g., 'https://api.example.com/users')
 */

export function buildUrl(endpoint, apiVersion) {
  const baseUrl = process.env.BASE_URL;

  if (!baseUrl) {
    throw new Error("BASE_URL is not defined in the environment.");
  }

  const cleanBaseUrl = baseUrl.trim().replace(/\/+$/, "");
  const cleanEndpoint = endpoint.trim().replace(/^\/+/, "");

  const fullUrl = `${cleanBaseUrl}${
    apiVersion ? `/${apiVersion}/` : "/"
  }${cleanEndpoint}`;

  return fullUrl;
}
