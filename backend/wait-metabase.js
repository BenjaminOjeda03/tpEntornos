const http = require("http");

function check() {
    return new Promise(resolve => {
        http.get("http://metabase:3000/api/session/properties", res => {
            
            // Metabase responde 503 mientras arranca → lo tomamos como "está vivo"
            if (res.statusCode === 200 || res.statusCode === 503) {
                resolve(true);
            } else {
                resolve(false);
            }

        }).on("error", () => resolve(false));
    });
}

(async () => {
    console.log("⏳ Esperando Metabase...");

    while (true) {
        const ready = await check();
        if (ready) {
            console.log("✅ Metabase detectado, iniciando backend...");
            break;
        }
        await new Promise(r => setTimeout(r, 3000));
    }

    // Iniciar backend real
    require("child_process").spawn("npm", ["start"], {
        stdio: "inherit"
    });

})();
