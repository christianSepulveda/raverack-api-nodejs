import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class TableCapacityModel extends Model {
  public id!: string;
  public capacity!: number;
  public active!: boolean;
  public companyid!: string;
}

TableCapacityModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
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
    modelName: "TableCapacity",
    tableName: "tables_capacity",
    timestamps: false,
  }
);

export default TableCapacityModel;
