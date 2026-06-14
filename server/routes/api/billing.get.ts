import { defineHandler } from "nitro";
import { sql } from "../../utils/db";

export default defineHandler(async () => {
  try {
    const bills = await sql`
      SELECT b.*, c.name as customer_name 
      FROM bills b 
      JOIN customers c ON b.customer_id = c.customer_id 
      ORDER BY b.created_at DESC
    `;
    return bills;
  } catch (error) {
    console.error("Database error:", error);
    return [];
  }
});