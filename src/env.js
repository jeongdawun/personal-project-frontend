const env = {
    mode: process.env.NODE_ENV,
    api: {
        MAIN_API_URL: process.env.VUE_APP_BASE_URL,
        MAIN_AWS_BUCKET_NAME: process.env.VUE_APP_AWS_BUCKET_NAME,
        MAIN_AWS_BUCKET_REGION: process.env.VUE_APP_AWS_BUCKET_REGION,
        MAIN_AWS_BUCKET_IDENTITY_POOL_ID: process.env.VUE_APP_AWS_BUCKET_IDENTITY_POOL_ID,
    },
};

export default env;