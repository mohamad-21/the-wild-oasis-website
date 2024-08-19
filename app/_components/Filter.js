"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const filterOptions = [
  {
    label: 'All cabins',
    value: 'all'
  },
  {
    label: '1-3 guests',
    value: 'small'
  },
  {
    label: '4-7 guests',
    value: 'medium'
  },
  {
    label: '8-12 guests',
    value: 'large'
  },
];

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentFilter = searchParams.get('capacity') || 'all';

  function handleFilter(value) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex justify-end gap-3 py-5">
      {filterOptions.map(option => (
        <button
          className={`border border-primary-700 py-2 px-5 rounded-sm hover:bg-primary-700 ${currentFilter === option.value ? 'bg-primary-700' : ''} transition-all text-sm`}
          onClick={() => handleFilter(option.value)}
          key={option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default Filter;
