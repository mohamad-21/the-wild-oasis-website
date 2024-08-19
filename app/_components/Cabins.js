import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function Cabins({ filter }) {
  const cabins = await getCabins();

  let filteredCabins = cabins;

  if (filter === 'small') filteredCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
  if (filter === 'medium') filteredCabins = cabins.filter(cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7);
  if (filter === 'large') filteredCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);

  return (
    <div>
      {filteredCabins.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {filteredCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Cabins;
