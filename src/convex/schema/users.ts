import { defineTable } from "convex/server";
import { v } from "convex/values";


export const Role = v.union(v.literal("ADMIN"),v.literal("CLIENT"),v.literal("OWNER"))

export default defineTable({
    email:v.string(),
    role:Role
})