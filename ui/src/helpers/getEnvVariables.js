export const getEnvVariables = () => {
    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        VITE_BCRYPT_HASH: import.meta.env.VITE_BCRYPT_HASH,
    }
}