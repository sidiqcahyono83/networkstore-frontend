module.exports = {
  apps: [
    {
      name: "teranetbackend",
      script: "bun",
      args: "dev",
      interpreter: "none", // Tidak menggunakan interpreter khusus
      watch: true, // Opsional: jika Anda ingin memantau perubahan file
    },
  ],
};
