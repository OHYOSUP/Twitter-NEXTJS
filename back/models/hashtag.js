module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    }
  );
  Hashtag.associate = (db) => {
    db.Comment.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
