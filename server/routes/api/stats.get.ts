import { defineHandler } from "nitro";
import { sql } from "../../utils/db";

export default defineHandler(async () => {
  try {
    const totalCustomers = await sql`SELECT COUNT(*) FROM customers`;
    const paidBills = await sql`SELECT COUNT(*) FROM bills WHERE status = 'Paid'`;
    const unpaidBills = await sql`SELECT COUNT(*) FROM bills WHERE status = 'Unpaid' OR status = 'Pending'`;
    const totalRevenue = await sql`SELECT SUM(amount) FROM bills WHERE status = 'Paid'`;

    return {
      totalCustomers: Number(totalCustomers[0].count) || 0,
      paidBills: Number(paidBills[0].count) || 0,
      unpaidBills: Number(unpaidBills[0].count) || 0,
      totalRevenue: Number(totalRevenue[0].sum) || 0
    };
  } catch (error) {
    console.error("Database error:", error);
    return { totalCustomers: 0, paidBills: 0, unpaidBills: 0, totalRevenue: 0 };
  }
});