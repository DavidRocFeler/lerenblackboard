import { UserRepository } from "../repositories/user.repository";
import { CredentialRepository } from "../repositories/credential.repository";
import bcrypt from "bcrypt";
import { Credential } from "../entities/Credential";

const usersToPreload = [
  { name: "Fidel", email: "fidel@example.com", password: "Password123!" },
  { name: "Maria", email: "maria@example.com", password: "Password123!" },
  { name: "Eva", email: "eva@example.com", password: "Password123!" },
  { name: "Nahan", email: "nathan@example.com", password: "Password123!" },
  { name: "David", email: "david@example.com", password: "Password123!" },
];

export const preloadUsers = async () => {
  try {
    const existingUsers = await UserRepository.find();
    if (!existingUsers.length) {
      for (const userData of usersToPreload) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // ✅ Crear y guardar la credencial antes de asignarla
        const credential = new Credential();
        credential.password = hashedPassword;
        await CredentialRepository.save(credential);
        console.log("🔹 Credencial guardada:", credential); //

        // ✅ Crear el usuario y asignarle la credencial
        const user = UserRepository.create({
          name: userData.name,
          email: userData.email,
          credential, // 👈 Aseguramos que el usuario tenga credencial
        });
        console.log("✅ Usuario creado con credencial asignada:", user);

        await UserRepository.save(user);
      }
      console.log("✅ Usuarios precargados con credenciales.");
    } else {
      console.log("⚠️ Usuarios ya existen en la base de datos.");
    }
  } catch (error) {
    console.error("❌ Error precargando usuarios:", error);
  }
};
