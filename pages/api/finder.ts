import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import cheerio from "cheerio";
import { IDates, IFinderResponse } from "types/data";

const tennisList = [
  "Henry de Montherlant",
  "Thiéré",
  // "NEUVE SAINT PIERRE",
  // "Candie",
  // "Philippe Auguste",
  // "Poliveau",
];

const DEFAULT_PARAMS = {
  // url: "https://tennis.paris.fr/tennis/jsp/site/Portal.jsp?page=recherche&action=ajax_load_planning",
  headers: {
    accept: "*/*",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "x-requested-with": "XMLHttpRequest",
  },
  method: "POST",
};

async function parseAvailability(html): Promise<any> {
  const freeSpots = {} as IDates;
  const $ = cheerio.load(html, {
    normalizeWhitespace: true,
  });

  // stop now if we cant book
  if ($(".reservation").get().length < 1) return null;

  $("tbody tr").each((index, element) => {
    const line = $(element).find("td span").text().trim();
    const count = (line.match(/LIBRE/g) || []).length;
    if (count < 1) return;

    const time = $(element).find("td").first().text().trim();
    freeSpots[time] = count;
  });

  return freeSpots;
}

async function fetchAvailability(
  tennis: string,
  date: string
): Promise<IDates> {
  const data = new URLSearchParams();
  data.append("name_tennis", tennis);
  data.append("date_selected", date);
  const r = await fetch(
    "https://tennis.paris.fr/tennis/jsp/site/Portal.jsp?page=recherche&action=ajax_load_planning",
    {
      ...DEFAULT_PARAMS,
      body: data.toString(),
    }
  );

  return parseAvailability(await r.text());
}

function makeDates(today: Date): Array<string> {
  return [...Array(6)].map((_, delta: number) =>
    dayjs(today).add(delta, "day").format("DD/MM/YYYY")
  );
  // return ["01/06/2021"];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<IFinderResponse>
) => {
  const dates = makeDates(new Date());
  const responses = await Promise.all(
    tennisList.map(async (tennis: string) => {
      const datesObj = await dates.reduce(async (obj, date) => {
        const acc = await obj;
        try {
          const res = await fetchAvailability(tennis, date);
          // only return dates with availabilities
          if (Object.keys(res).length > 0) {
            acc[date] = res;
          }
        } catch (err) {
          console.log(err);
        }

        return acc;
      }, {});

      return {
        name: tennis,
        dates: datesObj,
      };
    })
  );

  // console.log(JSON.stringify(responses, null, 2));

  res.status(200).json(responses);
};
