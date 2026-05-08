export async function register() {
  // Only runs in Node.js runtime (not Edge)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const baseUrl =
      process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'

    // In dev mode, Next.js compiles routes lazily (on first request).
    // This causes the Payload REST API to be unavailable until a route is
    // first accessed (e.g. by visiting the admin panel).
    // We warm up the catch-all Payload API route so it is ready before the
    // web frontend makes its first request.
    const warmUp = async () => {
      const maxAttempts = 10
      const delayMs = 3000

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise((r) => setTimeout(r, delayMs))
        try {
          const res = await fetch(`${baseUrl}/api/blog-posts?limit=1`)
          // 200 or 401 both mean the route is compiled and responding
          if (res.ok || res.status === 401) return
        } catch {
          // Server not ready yet — retry
        }
      }
    }

    void warmUp()
  }
}
