import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class BoxNumberModel extends Model {
  public id!: string;
  public boxnumber!: number;
  public customerid!: string | null;
  public available!: boolean;
  public companyid!: string;
}

BoxNumberModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    boxnumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerid: {
      type: DataTypes.STRING || null,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    companyid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "BoxNumber",
    tableName: "boxnumbers",
    timestamps: false,
  }
);

export default BoxNumberModel;
