const { scrypt, randomBytes } = require ("crypto");
const { promisify } = require("util");

// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);

class Password {
    static async toHash(password) {
      const salt = randomBytes(8).toString("hex");
      const buf = (await scryptAsync(password, salt, 64));
      return `${buf.toString("hex")}.${salt}`;
    }
    static async compare(storedPassword, suppliedPassword) {
     // split() returns array
      const [hashedPassword, salt] = storedPassword.split(".");
     // we hash the new sign-in password
      const buf = (await scryptAsync(suppliedPassword, salt, 64));
     // compare the new supplied password with the stored hashed password
      return buf.toString("hex") === hashedPassword;
    }
  }

  module.exports = Password;