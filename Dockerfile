FROM node:24.12.0-alpine@sha256:c921b97d4b74f51744057454b306b418cf693865e73b8100559189605f6955b8
 
# Forzar modo CI para que pnpm no pida confirmaciones visuales
ENV CI=true
 
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate
 
WORKDIR /app
 
COPY src .
 
# Instalamos (pnpm subirá niveles y encontrará /app/packages/shared-types)
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --ignore-scripts --no-frozen-lockfile
 
ENV PATH=/app/mf-system-design/src/node_modules/.bin:$PATH
 
EXPOSE 4173
 
CMD ["pnpm", "run", "preview", "--host"]
 