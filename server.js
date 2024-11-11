import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import logger from "./middlewares/logger.js"
import { fileURLToPath } from "url";
import path from "path";

let app = express();

app.use(logger("root"));
app.use("/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => res.sendFile("index.html", { root: path.dirname(fileURLToPath(import.meta.url)) }));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});