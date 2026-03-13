import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const createAdmin = async () => {
  try {
    const adminEmail = "gsonicadmin@gmail.com";
    const adminPassword = "admin123";

    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log("Admin already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      firstname: "Gsonic",
      lastname: "admin",
      phone: "9812345678",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin created successfully: ${admin.email}`);
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export default createAdmin;
