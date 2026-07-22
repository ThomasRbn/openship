// Resolves the hoisted Next.js binary and runs it in-process.
//
// Workspace installs put `next` in the repo-root node_modules, so a relative
// `node_modules/next/...` path under apps/dashboard breaks. Resolving via
// createRequire keeps the same `node --import ./scripts/load-env.mjs` launch
// pattern (required because Next forwards execArgv into NODE_OPTIONS).
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

process.argv.splice(1, 1, nextBin);
await import(pathToFileURL(nextBin).href);
