# ── Stage 1 : Build ──────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Installer les dépendances en premier (cache Docker optimal)
COPY package*.json ./
RUN npm ci --prefer-offline

# Copier le reste du code (.env.local inclus pour que Vite l'embarque)
COPY . .
RUN npm run build

# ── Stage 2 : Serve (nginx) ──────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
