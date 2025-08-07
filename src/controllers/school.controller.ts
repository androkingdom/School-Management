import { Request, Response } from "express";
import { prisma } from "@/libs/prisma";
import { CreateSchoolSchema, ListSchoolsSchema } from "@/validator/school.zod";
import { SendError } from "@/utils/SendError";
import { SendRes } from "@/utils/SendRes";
import { calculateDistance } from "@/utils/distanceCalc";
import { asyncHandler } from "@/utils/asyncHandler";

const addSchool = asyncHandler(async (req: Request, res: Response) => {
  const { name, address, latitude, longitude } = CreateSchoolSchema.parse(
    req.body
  );

  const existingSchool = await prisma.school.findUnique({
    where: {
      latitude_longitude: { latitude, longitude },
    },
    select: { id: true, name: true }, // Minimal data fetch
  });

  if (existingSchool) {
    throw SendError.custom({
      status: 409,
      code: "SCHOOL_ALREADY_EXISTS",
      message: "School already exists at this location",
    });
  }

  // Create new school
  const school: any = await prisma.school.create({
    data: { name, address, latitude, longitude },
  });

  return res
    .status(201)
    .json(SendRes.ok({ status: 201, message: "School created", data: school }));
});

const listSchools = asyncHandler(async (req: Request, res: Response) => {
  const { latitude, longitude } = ListSchoolsSchema.parse(req.query);

  const schools = await prisma.school.findMany();

  const schoolsWithDistance = schools
    .map((school: any) => ({
      ...school,
      distance: calculateDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      ),
    }))
    .sort((a: any, b: any) => a.distance - b.distance);

  return res.json(
    SendRes.ok({
      status: 200,
      message: "Schools retrieved and sorted by proximity",
      data: {
        userLocation: { latitude: latitude, longitude: longitude },
        totalSchools: schoolsWithDistance.length,
        schools: schoolsWithDistance,
      },
    })
  );
});

export { listSchools, addSchool };
