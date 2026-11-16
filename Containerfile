# One image for everything: the Vite dev server, lint, typecheck, tests and the production build.
# Dependencies live in /node_modules, above the repository mounted at /work, so module
# resolution finds them and the checkout stays clean.
FROM mirror.gcr.io/library/node:26.13.0-trixie-slim
WORKDIR /
COPY package.json package-lock.json /
RUN npm ci --no-audit --no-fund
ENV PATH=/node_modules/.bin:$PATH
WORKDIR /work
