db.createUser({
  user: "api",
  pwd: "apiPassword",
  roles: [{ role: "readWrite", db: "vaigram" }],
});
