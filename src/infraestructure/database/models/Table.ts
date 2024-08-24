import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class TableModel extends Model {
  public id!: string;
  public number!: number;
  public capacity!: number;
  public custiomerId!: string;
}

TableModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: instance,
    modelName: "Table",
    tableName: "tables",
    timestamps: false,
  }
);

export default TableModel;
