// Cloudflare Worker: serve the Hugo blog at https://nvnest.com/blog/*
// by reverse-proxying to the blog's Cloudflare Pages origin.
//
// Attach via routes (see wrangler.toml):
//   nvnest.com/blog*
//   www.nvnest.com/blog*
//
// The blog is built with Hugo baseURL = "https://nvnest.com/blog/", so it emits
// root-relative links such as /blog/css/... . We strip the "/blog" prefix and
// fetch the same path from BLOG_ORIGIN (the blog Pages project host), keeping the
// browser URL on nvnest.com/blog/* (HTTP 200, no client redirect).

export default {
  async fetch(request, env) {
    const origin = env.BLOG_ORIGIN;
    if (!origin) {
      return new Response("BLOG_ORIGIN is not configured", { status: 500 });
    }

    const url = new URL(request.url);

    if (url.pathname === "/blog") {
      url.pathname = "/";
    } else if (url.pathname.startsWith("/blog/")) {
      url.pathname = url.pathname.slice("/blog".length);
    } else {
      // Route should only match /blog*, but fail safe.
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
