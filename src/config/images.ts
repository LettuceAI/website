/**
 * Global image configuration
 * All image URLs are stored here for easy management
 * Replace the placeholder URLs with your cloud CDN URLs
 */
export const images = {
    logo: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEKHtLXijUThaiVjQ5lFnW8C6uS7RMmf4pPb9t`,

    desktopView: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEfNzuUARwzBGL7mPAbcZYn9yR6UWxaFkXK58g`,

    models: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE9CgMPInOqX2jKv1NyFE6ATZbzRdLmxlchJVB`,
    characters: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE7QY9dyS3XDOMPNhgrUjbZp9fWTYnCuB0v4wx`,
    memoryManager: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEYFTetE9CRKc9fpLjm375Owaivx1hsy0nkVrM`,

    providers: {
        openai: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE9OAPzonOqX2jKv1NyFE6ATZbzRdLmxlchJVB`,
        anthropic: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEdtOF0SmpPCcV0eNMqHE2pOGjTY185FLrRZvs`,
        gemini: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEbdvBYBrSL7tJui189YNX2TDB4wegF6kGIlzn`,
        deepseek: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEhgsm66Yy8QKsz1bUcRixZ7tHBO4qoCruLYPV`,
        mistral: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEBzLzYHXeaxpi2W1v7t9cGgFBwm4kZdrEyDTJ`,
        groq: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEx2PR3XUkw2MN5G1QtVTFbq6Audpci7RZUDXS`,
        xai: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEB1vGLfXeaxpi2W1v7t9cGgFBwm4kZdrEyDTJ`,
        openrouter: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEayZC9kk2YCJtugBOc6lW5rpjmvPS7IeH3FG1`,
        moonshot: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEoE50kUxgeUAy1BckbI0oS8FO2ihTxv7GqEl9`,
        qwen: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEY7kb289CRKc9fpLjm375Owaivx1hsy0nkVrM`,
        ananas: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEI3u3xzAH5ZchmM4LX9xYKk8DP0ard7TuUASv`,
        zai: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiErMY9gUBKjANVFCI4TD3ie1sRfLdyMgv6wHbh`,
        featherless: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiENVcWbuA3hVcAIWJ9gtzT0D1KL6vpeBY7XZfR`,
        nanogpt: `https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE9vfRvjnOqX2jKv1NyFE6ATZbzRdLmxlchJVB`,
    },

    quickStart: {
        step1: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEGSaQBWolvZNz7b9S6JOnaWIErcYV8jTRAoKU",
        step2: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiERJD3yz4Jx2P34yDg6iKGIpAlcoTf9etwqHkz",
        step3: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEStjtW5fjxYOkrVMn2NmPXpy46uELTt0boAJw",
        step4: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiECKhW9NdKF5jgO0T3epcX6SBoEmPVManwqhUN",
        step5: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEgoDCLuz1uLhxGKCwTQRqZ4bmt2ikFOrvslNd",
        step6: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEzapwjd5CgsDQbf3mrGI2U5jA9RHS8i0x1naJ",
    },
    
    charactersDocs: {
        step1: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEN4bBGjA3hVcAIWJ9gtzT0D1KL6vpeBY7XZfR",
        step2: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEzzTntk5CgsDQbf3mrGI2U5jA9RHS8i0x1naJ",
        step3: "https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEDWVdcoLk6KQEIaUv3RMC80pwfLYbPBhuTci9",
    }
} as const;

export type ImageKey = keyof typeof images;
export type ProviderKey = keyof typeof images.providers;
