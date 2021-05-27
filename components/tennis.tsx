import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ITennis } from "types/data";

import { GiTennisBall } from "react-icons/gi";
import { FiExternalLink } from "react-icons/fi";

dayjs.extend(customParseFormat);

export default function Tennis({ tennis }: { tennis: ITennis }) {
  return (
    <div className="flex flex-col lg:w-60 mb-10">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://tennis.paris.fr/tennis/jsp/site/Portal.jsp?page=recherche&view=planning&name_tennis=${encodeURIComponent(
          tennis.name
        )}`}
      >
        <h2 className="flex items-center justify-center space-x-2 text-xl pb-2 font-medium leading-8 text-gray-600">
          <span>{tennis.name}</span>
          <FiExternalLink className="text-blue-600 h-4 w-4" />
        </h2>
      </a>
      <div className="space-y-2 flex flex-col flex-1">
        {Object.keys(tennis.dates).length === 0 && (
          <div className="flex flex-col flex-1 items-center justify-center">
            <h3 className="text-gray-500">Pas de dispos</h3>
          </div>
        )}
        {Object.keys(tennis.dates).map((date: string, idx: number) => (
          <div
            key={`${tennis.name}-{date}-${idx}`}
            className="rounded-md px-3 py-3 bg-blue-100"
          >
            <span className="block text-center text-sm mb-2 text-blue-500">
              {date} ({dayjs(date, "DD/MM/YYYY").format("ddd")})
            </span>
            <div>
              {Object.keys(tennis.dates[date]).map((time: string) => (
                <div
                  key={`${tennis.name}-{date}-${idx}-${time}`}
                  className="flex justify-between rounded-md px-2 py-1 my-0.5 hover:bg-blue-200"
                >
                  <span>{time}</span>
                  <span className="flex items-center">
                    {tennis.dates[date][time]} <GiTennisBall />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
