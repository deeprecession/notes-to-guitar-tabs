import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["tests/**/*.test.ts", "**/*.test.ts"],
        coverage: {
            reporter: ["text", "lcov"],
            exclude: ["node_modules/", "tests/"],
        },
    },
})
