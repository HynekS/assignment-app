import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { covidDataSchema } from "~/validation/covidData";
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

    const validated = covidDataSchema.parse(await covidRes.json());

    type ByNations = {
      date: string;
      England: number;
      Wales: number;
      "Northern Ireland": number;
      Scotland: number;
    };

    let byNations = validated.body.reduce(
      (acc: ByNations[], curr: (typeof validated.body)[number]) => {
        let existingEntry = acc.find((entry) => entry.date === curr.date);

        if (existingEntry) {
          existingEntry[curr.areaName] = curr.newCasesByPublishDate;
        } else {
          let newEntry = {
            date: curr.date,
            [curr.areaName]: curr.newCasesByPublishDate,
          };
          acc.push(newEntry as ByNations);
        }

        return acc;
      },
      []
    );

    type Cumulative = Pick<
      ByNations,
      "England" | "Northern Ireland" | "Scotland" | "Wales"
    >;

    let cumulativeAsObject = byNations.reduce(
      (acc: Cumulative, curr) => {
        acc.England += curr.England || 0;
        acc["Northern Ireland"] += curr["Northern Ireland"] || 0;
        acc.Scotland += curr.Scotland || 0;
        acc.Wales += curr.Wales || 0;

        return acc;
      },
      { England: 0, Wales: 0, "Northern Ireland": 0, Scotland: 0 }
    );

    type Entries<T> = {
      [K in keyof T]: [K, T[K]];
    }[keyof T][];

    const getEntries = <T extends object>(obj: T) =>
      Object.entries(obj) as Entries<T>;

    let cumulative = getEntries(cumulativeAsObject).map(([type, value]) => ({
      type,
      value,
    }));

    return { byNations, cumulative };
  }),
});
