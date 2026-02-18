import { Cookie } from './types';

/**
 * Generates a cookie-setting URL for the specified brand and TLD
 *
 * Format: https://www.{brand}.{tld}/global/cookie/set/{encoded}
 *
 * Where {encoded} is a URL-encoded string containing:
 * - c={cookies} - comma-separated list of n={name}&v={value} pairs
 * - d={base64Dest} - base64-encoded destination URL (optional)
 *
 * Full format: c={cookies}|d={base64Dest} or just c={cookies}
 */
export function generateCookieUrl(
  brand: string,
  tld: string,
  cookies: Cookie[],
  destination?: string
): string {
  // If no cookies provided, add a placeholder to satisfy the endpoint requirement
  const effectiveCookies = cookies.length > 0 ? cookies : [{ name: '1', value: '1' }];

  // Format cookies as comma-separated n={name}&v={value} pairs
  const cookieString = effectiveCookies
    .map(cookie => `n=${cookie.name}&v=${cookie.value}`)
    .join(',');

  let encodedPayload = `c=${cookieString}`;

  // Add destination if provided
  if (destination && destination.trim()) {
    const base64Dest = btoa(destination.trim());
    encodedPayload += `|d=${base64Dest}`;
  }

  // URL encode the entire payload
  const urlEncodedPayload = encodeURIComponent(encodedPayload);

  // Construct final URL
  return `https://www.${brand}.${tld}/global/cookie/set/${urlEncodedPayload}`;
}
