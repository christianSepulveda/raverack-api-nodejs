import express from "express";
import sequelize from "../../infraestructure/database/sequelize";

export default function initSequelizeServer(
  app: express.Application,
  port: string | number
) {
  sequelize
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
