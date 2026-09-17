import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a self-contained server.js and only the
  // node_modules it actually traced. Cuts the runtime image from ~600MB to
  // ~200MB, which matters on a 16GiB volume shared with Postgres and uploads.
  output: "standalone",

  // Without this, Next infers the tracing root by walking up to the nearest
  // package.json — which is Annotex/package.json locally, nesting the output at
  // .next/standalone/frontend/. Inside Docker the build context is only
  // ./frontend, so nothing is above it and the output lands flat instead. The
  // Dockerfile's COPY paths cannot be right for both. Pinning the root keeps
  // the layout identical everywhere.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
