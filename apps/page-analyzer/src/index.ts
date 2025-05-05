import express from "express";
import requestRoutes from "./routes/request.routes";
import { PORT } from "./config/constants";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/request", requestRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});

export default app;
