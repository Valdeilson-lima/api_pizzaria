import "dotenv/config";
import cors from "cors";
import express from "express";
import router from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
});


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
