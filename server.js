import express from "express";
import adminRouter from "./routes/adminRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import podcastRouter from "./routes/podcastRoutes.js";
import registrationRouter from "./routes/registrationRoutes.js";

let app = express();

app.get("/admin", adminRouter);
app.get("/events", eventRouter);
app.get("/podcasts", podcastRouter);
app.get("/registrations", registrationRouter);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});