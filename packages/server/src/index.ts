import { server } from "./app";

const PORT = 80;

server.listen(PORT, () => {
  console.log(`Chat app listening on port ${PORT}`);
});
