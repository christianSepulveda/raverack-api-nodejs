import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class UserModel extends Model {
  public id!: string;
  public username!: string;
  public password!: string;
  public phoneNumber!: string;
  public active!: boolean;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: instance,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default UserModel;
