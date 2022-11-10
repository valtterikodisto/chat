import { server } from "./app";

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Chat app listening on port ${PORT}`);
});
