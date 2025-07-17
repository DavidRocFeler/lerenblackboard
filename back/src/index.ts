import { PORT } from "./setting/envs";
import app from "./server";
import "reflect-metadata";
import { AppDataSource } from "./setting/dataSource";
import { preloadUsers } from "./helpers/preloadUsers"; // 👈 Importar preload de usuarios

const initialize = async () => {
    console.log("🚀 Initializing server...");

    try {
        await AppDataSource.initialize();
        console.log("✅ Database initialized");

        await preloadUsers(); // 👈 Llamar a la función para precargar usuarios
        console.log("✅ Users preloaded");

        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Error initializing the server:", error);
    }
};

initialize();
