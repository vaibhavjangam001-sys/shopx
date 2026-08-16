import app from './app.js';
import { connectDB, env } from './config/index.js';

const startServer = async () => {
  try {
    await connectDB();

    const PORT = env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
