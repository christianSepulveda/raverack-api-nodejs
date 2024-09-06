import { DataTypes, Model } from "sequelize";
import instance from "../sequelize";

class ReservationModel extends Model {
  public id!: string;
  public date!: Date;
  public time!: string;
  public capacity!: number;
  public customerId!: string;
  public tableId!: string;
  public active!: boolean;
}

ReservationModel.init(  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
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
    tableId: {
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
    tableName: "reservations",
    modelName: "Reservation",
    timestamps: false,
  }
);

export default ReservationModel;
