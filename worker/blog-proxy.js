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
//
// Redirect hardening: any redirect the origin emits (e.g. Pages' "/foo.html ->
// /foo" 308) is rewritten so it stays on nvnest.com/blog instead of leaking the
// *.pages.dev host or dropping the "/blog" prefix.

const BLOG_PREFIX = "/blog";

function toPublicPath(pathname) {
  if (pathname === BLOG_PREFIX || pathname.startsWith(BLOG_PREFIX + "/")) {
    return pathname; // already prefixed
  }
  return BLOG_PREFIX + (pathname.startsWith("/") ? pathname : "/" + pathname);
}

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

    if (url.pathname === BLOG_PREFIX) {
      url.pathname = "/";
    } else if (url.pathname.startsWith(BLOG_PREFIX + "/")) {
      url.pathname = url.pathname.slice(BLOG_PREFIX.length);
    } else {
      return new Response("Not found", { status: 404 });
    }

    url.protocol = "https:";
    url.hostname = origin;

    const response = await fetch(new Request(url, request));
    const headers = new Headers(response.headers);

    // Keep origin redirects on the public host/path.
    const location = headers.get("location");
    if (location) {
      try {
        const loc = new URL(location, url);
        if (loc.hostname === origin) {
          loc.hostname = "nvnest.com";
          loc.port = "";
          loc.pathname = toPublicPath(loc.pathname);
          headers.set("location", loc.toString());
        } else if (location.startsWith("/")) {
          headers.set("location", toPublicPath(new URL(location, url).pathname) + new URL(location, url).search);
        }
      } catch {
        // leave malformed Location untouched
      }
    }

    // The blog origin carries `X-Robots-Tag: noindex` (to keep the raw
    // *.pages.dev host out of search results). Strip it here so the public
    // nvnest.com/blog pages stay indexable.
    headers.delete("x-robots-tag");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
