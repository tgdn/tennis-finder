import Layout from "components/layout";
import Tennis from "components/tennis";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { IFinderResponse, ITennis } from "types/data";

export default function Home() {
  const { data } = useSWR<IFinderResponse>("/api/finder");

  // use this to filter empty ones
  // const [filteredData, setFilteredData] = useState([]);
  // useEffect(() => {
  //   setFilteredData(
  //     data.filter((tennis: ITennis) => Object.keys(tennis.dates).length > 0)
  //   );
  // }, [data]);

  return (
    <Layout>
      <div className="mt-8 md:mt-12">
        <div className="space-y-4 lg:space-y-0 lg:mb-4 lg:flex lg:space-x-8">
          {data && (
            <>
              {data.map((tennis: ITennis) => (
                <Tennis key={`${tennis.name}`} tennis={tennis} />
              ))}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
