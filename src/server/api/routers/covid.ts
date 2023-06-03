import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const covidRouter = createTRPCRouter({
  getCovidData: publicProcedure.query(async () => {
    const apiUrl =
      "https://api.coronavirus.data.gov.uk/v2/data?areaType=nation&metric=newCasesByPublishDate&format=json";

    const covidRes = await fetch(apiUrl);

    if (!covidRes.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    return covidRes.json();
  }),
});
