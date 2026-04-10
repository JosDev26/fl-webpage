const PAYLOAD_URL = "http://localhost:3000";
async function fetchFromPayload(endpoint) {
  const res = await fetch(`${PAYLOAD_URL}/api/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Payload API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
async function getReviews() {
  const data = await fetchFromPayload("reviews?sort=position&limit=100");
  return data.docs;
}
async function getServices() {
  const data = await fetchFromPayload("services?sort=position&limit=100");
  return data.docs;
}
async function getBlogPosts() {
  const data = await fetchFromPayload(
    "blog-posts?where[status][equals]=published&sort=-published_date&limit=100&depth=2"
  );
  return data.docs;
}
async function getBlogPost(slug) {
  const data = await fetchFromPayload(
    `blog-posts?where[slug][equals]=${encodeURIComponent(slug)}&where[status][equals]=published&limit=1&depth=2`
  );
  return data.docs[0] ?? null;
}
async function getTags() {
  const data = await fetchFromPayload("tags?limit=100");
  return data.docs;
}

export { getTags as a, getBlogPosts as b, getReviews as c, getServices as d, getBlogPost as g };
