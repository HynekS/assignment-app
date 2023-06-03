import z from "zod";

export const covidDataSchema = z.object({
  body: z.array(
    z.object({
      areaType: z.literal("nation"),
      areaCode: z.enum(["E92000001", "N92000002", "S92000003", "W92000004"]),
      areaName: z.enum(["England", "Northern Ireland", "Scotland", "Wales"]),
      date: z.string(), // don't convert to data yet
      newCasesByPublishDate: z.number(),
    })
  ),
});

export type covidDataType = z.infer<typeof covidDataSchema>;
