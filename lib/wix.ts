import "server-only";

const clientId = process.env.WIX_CLIENT_ID;
const BASE = "https://www.wixapis.com";
const FETCH_TIMEOUT_MS = 25_000;

type TokenCache = { access: string; expiresAt: number };
let tokenCache: TokenCache | null = null;

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = FETCH_TIMEOUT_MS) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ctl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function getVisitorToken(): Promise<string | null> {
  if (!clientId) return null;
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60_000) return tokenCache.access;

  const r = await fetchWithTimeout(`${BASE}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, grantType: "anonymous" }),
  });
  if (!r.ok) {
    console.warn("[wix] token error", r.status, await r.text());
    return null;
  }
  const j = (await r.json()) as { access_token: string; expires_in: number };
  tokenCache = { access: j.access_token, expiresAt: Date.now() + j.expires_in * 1000 };
  return tokenCache.access;
}

export async function wixDataQuery<T = unknown>(
  dataCollectionId: string,
  query: Record<string, unknown> = {},
): Promise<T[]> {
  const token = await getVisitorToken();
  if (!token) return [];

  const r = await fetchWithTimeout(`${BASE}/wix-data/v2/items/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ dataCollectionId, query }),
  });
  if (!r.ok) {
    console.warn("[wix] query error", r.status, await r.text());
    return [];
  }
  const j = (await r.json()) as { dataItems?: Array<{ id?: string; data?: T }> };
  return (j.dataItems ?? []).map((it) => ({ ...(it.data as object), _id: it.id })) as T[];
}

export const isWixConfigured = () => Boolean(clientId);
