import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class TableModel extends Model {
  public id!: string;
  public state!: string;
  public number!: number;
  public capacityId!: string;
  public custiomerId!: string | null;
}

TableModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    state: { type: DataTypes.STRING, allowNull: false },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacityId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: true,
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
