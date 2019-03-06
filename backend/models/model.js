module.exports = (sequelize, DataTypes) => {
  var messages = sequelize.define('messages', {
    //userId: DataTypes.STRING,
    //therapist: DataTypes.STRING

    post: DataTypes.TEXT





  });

  messages.associate = (models) => {
    // associations can be defined here
  }

  return messages;
};
