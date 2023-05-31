module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30), // data type inspect
        allowNull: false, // email 필수 여부 treu - optional false - required
        unique: true,
      },
      nickname: {
        type: DataTypes.STRING(30), // data type inspect
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // data type inspect
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_unicode_ci",
      // 한글저장
    }
  );
  // 관계형 db 설정
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); // 다대다 관계 as -> 별칭
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Follwers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Follwings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
