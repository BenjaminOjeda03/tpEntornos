#!/bin/sh

URL="http://metabase:3000/api/health"

echo "Esperando a que Metabase esté listo en $URL..."

while true; do
  STATUS=$(curl -s $URL | grep -o '"status":"ok"')
  if [ "$STATUS" = '"status":"ok"' ]; then
    echo "✅ Metabase está listo!"
    break
  fi
  echo "⏳ Todavía no listo, intentando de nuevo en 5s..."
  sleep 5
done

exec "$@"  # Esto ejecuta el comando principal del contenedor
