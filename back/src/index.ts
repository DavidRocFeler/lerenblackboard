import { PORT } from "./config/envs";
import app from "./server";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { preloadData } from "./helpers/preloadUsers"; // 👈 Importar preload de usuarios

const initialize = async () => {
    console.log("🚀 Initializing server...");

    try {
        await AppDataSource.initialize();
        console.log("✅ Database initialized");

        await preloadData(); // 👈 Llamar a la función para precargar usuarios
        console.log("✅ Users preloaded");

        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Error initializing the server:", error);
    }
};

initialize();
