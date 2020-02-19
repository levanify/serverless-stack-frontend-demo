export default {
    s3: {
        REGION: "us-east-1",
        BUCKET: "levantuanlong-notes-app-uploads"
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://1tdwt8tq1e.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_2Cnlp0oqg",
        APP_CLIENT_ID: "fmm09iafrcu9nc34grff29hte",
        IDENTITY_POOL_ID: "us-east-1:241e0e4d-923e-4f19-aa11-f77635d813f4"
    },
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "pk_test_P2oU7MESncpfLZ3YXNetPiwp00v9RzxeIC"
};
