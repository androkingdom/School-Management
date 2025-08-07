import z from "zod";

const CreateSchoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "School address is required"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

type createSchool = z.infer<typeof CreateSchoolSchema>;

const ListSchoolsSchema = z.object({
  latitude: z.coerce
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z.coerce
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});
type listSchool = z.infer<typeof ListSchoolsSchema>;

export { CreateSchoolSchema, createSchool, ListSchoolsSchema, listSchool };
