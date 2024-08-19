import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from 'react';

export async function generateMetadata({ params: { cabinId } }) {
  const { name } = await getCabin(cabinId);
  return {
    title: `Cabin ${name}`
  }
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map(cabin => ({ cabinId: String(cabin.id) }))
}

export default async function Page({ params }) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-4xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<SpinnerMini className="mx-auto" />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
