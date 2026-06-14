import { defineHandler } from "nitro";
import { sql } from "../../utils/db";

export default defineHandler(async () => {
  try {
    const customers = await sql`SELECT * FROM customers ORDER BY customer_id ASC`;
    return customers;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
});