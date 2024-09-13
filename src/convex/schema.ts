import { authTables } from "@convex-dev/auth/server";
import { migrationsTable } from "convex-helpers/server/migrations";
import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";
import users from "./schema/users";
import clientinfo from "./schema/clientinfo";
import admininfo from "./schema/admininfo";
import ownerinfo from "./schema/ownerinfo";


export default defineSchema({
    
    migrations:migrationsTable,
    users,
    clientinfo,
    admininfo,
    ownerinfo
})