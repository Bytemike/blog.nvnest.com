// Cloudflare Worker: nvnest.com edge logic
//
// Routes (see wrangler.toml):
//   nvnest.com/blog*    -> reverse-proxy the Hugo blog from its Pages origin
//   www.nvnest.com/*    -> 301 redirect to the apex (nvnest.com)
//
// The blog is built with Hugo baseURL = "https://nvnest.com/blog/", so it emits
// root-relative links such as /blog/css/... . We strip the "/blog" prefix and
// fetch the same path from BLOG_ORIGIN (the blog Pages project host), keeping the
// browser URL on nvnest.com/blog/* (HTTP 200, no client redirect).

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www.nvnest.com/<path> -> https://nvnest.com/<path> (301)
    if (url.hostname === "www.nvnest.com" || url.hostname.startsWith("www.")) {
      const target = new URL(request.url);
      target.hostname = url.hostname.replace(/^www\./, "");
      return Response.redirect(target.toString(), 301);
    }

    // /blog reverse proxy
    const origin = env.BLOG_ORIGIN;
    if (!origin) {
      return new Response("BLOG_ORIGIN is not configured", { status: 500 });
    }

    if (url.pathname === "/blog") {
      url.pathname = "/";
    } else if (url.pathname.startsWith("/blog/")) {
      url.pathname = url.pathname.slice("/blog".length);
    } else {
      return new Response("Not found", { status: 404 });
    }

    url.protocol = "https:";
    url.hostname = origin;

    const response = await fetch(new Request(url, request));

    // The blog origin carries `X-Robots-Tag: noindex` (to keep the raw
    // *.pages.dev host out of search results). Strip it here so the public
    // nvnest.com/blog pages stay indexable.
    const headers = new Headers(response.headers);
    headers.delete("x-robots-tag");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
