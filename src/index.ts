import { app } from "./app";

import { connectDB } from "./db-connection";

const PORT = process.env.PORT || 3001;

// Connecting to the Database
connectDB();

app.listen(PORT, () => {
  console.log(`Started Authentication Service at ${PORT}`);
});
