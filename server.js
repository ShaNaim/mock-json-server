import jsonServer from "json-server";
import pause from "connect-pause";

const server = jsonServer.create();
server.use(jsonServer.defaults());

const delay = 300; // set to '0' for no delay.
const port = 3010;

// routes
server.use(pause(delay));
server.use("/error", function (req, res, next) {
  res.status(500).json({ error: true, message: "error" });
});

server.use("/health", (req, res, next) =>
  res.status(200).json({
    health: "OK",
    server: "json-server",
    version: "0.0.1",
    delay: delay + "ms",
    port: port,
  })
);

const router = jsonServer.router("db.json");
server.use("/question-set", jsonServer.router("db.question-types.json"));
server.use(router);

server.listen(port, () => {
  console.log(
    `JSON Server is running on port: ${port} , with a default delay of ${delay}ms.`
  );
});
