require("dotenv").config({ path: `.env.local` });

console.log("Setting environment variables for tests");
console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
