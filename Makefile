PROJECT_NAME=mf-system-desing
SERVICE=mf-system-desing
COMPOSE=docker compose

.PHONY: help dev stop restart logs shell add lint format check build clean

ayuda:
	@echo ""
	@echo "🚀 Comandos disponibles – Frontend"
	@echo ""
	@echo "DEV:"
	@echo "  make dev                 Levanta el frontend (Vite en Docker)"
	@echo "  make stop                Detiene el contenedor"
	@echo "  make restart             Reinicia el contenedor"
	@echo "  make logs                Ver logs del frontend"
	@echo "  make shell               Entrar al contenedor"
	@echo ""
	@echo "PRODUCCIÓN:"
	@echo "  make build               Verifica errores en el código"
	@echo ""
	@echo "UTILIDADES:"
	@echo "  make clean               Detiene contenedores y borra volúmenes"
	@echo ""

install:
	cd src && pnpm install

dev:
	$(COMPOSE) up -d --build

stop:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart $(SERVICE)

logs:
	$(COMPOSE) logs -f $(SERVICE)

shell:
	$(COMPOSE) exec $(SERVICE) sh

build:
	cd src && pnpm run build

clean:
	$(COMPOSE) down -v