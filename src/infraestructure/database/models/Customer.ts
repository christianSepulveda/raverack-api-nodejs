import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class CustomerModel extends Model {
  public id!: string;
  public fullname!: string;
  public rut!: string;
  public phonenumber!: string;
  public email!: string;
  public companyid!: string;
}

CustomerModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "Customer",
    tableName: "customers",
    timestamps: false,
  }
);

export default CustomerModel;
