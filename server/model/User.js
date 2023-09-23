const mongooose = require("../config/mongoDBConnection");

const UserSchema = new mongooose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongooose.model("User", UserSchema);

module.exports = UserModel;
