module.exports = {
  apps: [
    {
      name: "backend_express_local",
      script: "npm",
      args: "run start:prod",
      watch: true,
      instances: 1,
      max_memory_restart: "500M",
      interpreter: "node",
      env: {
        DATABASE_URL:
          "postgresql://postgres:1234@127.0.0.1:5432/test_expressjs_local",
      },
    },
  ],
};
