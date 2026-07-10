import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,

    use: {
        baseURL: "...",
        headless: false,
        launchOptions: {
            slowMo: 500
        },
        viewport: {
            width: 1920,
            height: 1080
        },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    },

    projects: [
        // Create storageState
        {
            name: 'setup',
            testMatch: /auth\.setup\.ts/
        },

        // Project dành riêng cho test Login
        // Không dùng storageState vì cần test luồng login thật
        {
            name: 'login',
            testMatch: /login\.spec\.ts/,
            use: {}
        },

        // Func: Every testcases will use storageState
        {
            name: 'authenticated',
            testIgnore: [
                /auth\.setup\.ts/,
                /login\.spec\.ts/
            ],

            use: {
                storageState: 'playwright/.auth/user.json'
            },
            dependencies: ['setup']
        }
    ]
});