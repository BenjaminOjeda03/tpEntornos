param(
    [string[]]$Command
)

$URL = "http://metabase:3000/api/health"  # usar nombre del servicio Docker

Write-Output "Esperando a que Metabase esté listo en $URL..."

while ($true) {
    try {
        $response = Invoke-RestMethod -Uri $URL -Method Get
        if ($response.status -eq "ok") {
            Write-Output "✅ Metabase está listo!"
            break
        }
    } catch {
        Write-Output "⏳ Todavía no listo, intentando de nuevo en 5s..."
    }
    Start-Sleep -Seconds 5
}

# Ejecutar comando principal
& $Command
