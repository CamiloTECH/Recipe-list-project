const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull:false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resumen:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    puntuacion:{
      type:DataTypes.INTEGER
    },
    puntajeSaludable:{
      type:DataTypes.INTEGER
    },
    pasos:{
      type:DataTypes.TEXT
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
