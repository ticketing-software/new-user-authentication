import mongoose, { Schema } from "mongoose";
import PasswordHash from "../utils/password-hash";

/**
 * The interface that describes properties that
 * are required to create a new user
 */
interface UserAttr {
  email: string;
  password: string;
}

/**
 * An interface that describes the properties
 * that a user document has
 */
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Middleware for mongoose before saving stuff
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordHash.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
