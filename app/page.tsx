'use client'

import Pagination from "@/components/UI/Pagination";
import { use } from "react";

type SearchParams =  Promise<{page: string}>

export default function Home({searchParams}: {searchParams:SearchParams}) {
  const page =  use(searchParams)

  return (
    <Pagination ItemCount={100} PageSize={20} CurrentPage={+page.page} />
  );
}
