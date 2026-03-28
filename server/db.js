import {Pool} from "pg";

const pool = new Pool({
  user: "postgres",
  password: "Pran0407@P",
  host: "localhost",
  port: 5432,
  database: "ecommerce",
});
export default pool;