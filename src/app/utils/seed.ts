import bcrypt from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

export const seedSuperAdmin = async () => {
	try {
		const isSuperAdminExists = await prisma.user.findUnique({
			where: {
				email: config.super_admin_email,
			},
		});
		if (isSuperAdminExists) {
			console.log("Super Admin already exists. Skipping seeding.");
			return;
		}
		const name = config.super_admin_name;
		const email = config.super_admin_email;
		const password = config.super_admin_password;

		if (!name || !email || !password) {
			console.error(
				"Super Admin credentials are not set in the environment variables.",
			);
			return;
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(config.bcrypt_salt_rounds),
		);

		const superAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.SUPER_ADMIN,
				needPasswordChange: false,
				emailVerified: true,
			},
		});

		console.log("Super Admin seeded successfully:", superAdmin);
	} catch (error) {
		await prisma.user.delete({
			where: {
				email: config.super_admin_email,
			},
		});
		console.error("Error seeding Super Admin:", error);
	}
};

export const seedTesterAdmin = async () => {
	try {
		const isTesterAdminExists = await prisma.user.findUnique({
			where: {
				email: config.tester_admin_email,
			},
		});
		if (isTesterAdminExists) {
			console.log("Tester Admin already exists. Skipping seeding.");
			return;
		}
		const name = config.tester_admin_name;
		const email = config.tester_admin_email;
		const password = config.tester_admin_password;

		if (!name || !email || !password) {
			console.error(
				"Tester Admin credentials are not set in the environment variables.",
			);
			return;
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(config.bcrypt_salt_rounds),
		);

		const testerAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.ADMIN,
				needPasswordChange: false,
				emailVerified: true,
			},
		});

		console.log("Tester Admin seeded successfully:", testerAdmin);
	} catch (error) {
		console.error("Error seeding Tester Admin:", error);

		await prisma.user.delete({
			where: {
				email: config.tester_admin_email,
			},
		});
	}
};

export const seedTesterDoctor = async () => {
	try {
		const isTesterDoctorExists = await prisma.user.findUnique({
			where: {
				email: config.tester_doctor_email,
			},
		});
		if (isTesterDoctorExists) {
			console.log("Tester Doctor already exists. Skipping seeding.");
			return;
		}
		const name = config.tester_doctor_name;
		const email = config.tester_doctor_email;
		const password = config.tester_doctor_password;

		if (!name || !email || !password) {
			console.error(
				"Tester Doctor credentials are not set in the environment variables.",
			);
			return;
		}

		const hashedPassword = await bcrypt.hash(
			password,
			Number(config.bcrypt_salt_rounds),
		);

		const testerDoctor = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role: Role.DOCTOR,
				needPasswordChange: false,
				emailVerified: true,
			},
		});

		console.log("Tester Doctor seeded successfully:", testerDoctor);
	} catch (error) {
		console.error("Error seeding Tester Doctor:", error);
		await prisma.user.delete({
			where: {
				email: config.tester_doctor_email,
			},
		});
	}
};
