import express from "express";
import sequelize from "../../infraestructure/database/sequelize";
import CustomerModel from "../../infraestructure/database/models/Customer";
import BoxNumberModel from "../../infraestructure/database/models/BoxNumber";
import UserModel from "../../infraestructure/database/models/User";

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
