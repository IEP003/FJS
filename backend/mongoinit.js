db.createUser(
  {
    user: "mainuser",
    pwd: "mainuserpassword",
    roles: [
      {
        role: "readWrite",
        db: "fjs-diplom"
      }
    ]
  }
);
db.createCollection("fjs-diplom");