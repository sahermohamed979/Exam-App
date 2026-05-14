"use client";
import { useMemo } from "react";
import DiplomaCard from "../components/diploma-card";
import UseDiplomaList from "../hooks/use-diploma-list";
import InfiniteScroll from "react-infinite-scroll-component";
import EndList from "@/src/shared/components/ui/end-list";
import ScrollMore from "@/src/shared/components/ui/scroll-more";
import { SkeletonCard } from "../skeletons/diplomas-card-skeletons";
import { SingleCardSkeleton } from "../skeletons/single-card-skeleton";
import HeaderDiploma from "../components/header-diploma";

export default function DashboardScreen() {
  const {
    data: diplomaPages,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = UseDiplomaList();

  const allDiplomas = useMemo(
    () => diplomaPages?.pages?.flatMap((page) => page.data) || [],
    [diplomaPages],
  );

  return isLoading ? (
    <SkeletonCard />
  ) : (
    <div className="flex flex-col h-screen">
      <HeaderDiploma />
      <InfiniteScroll
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pt-4 gap-3 justify-items-center"
        dataLength={allDiplomas.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <>
            <SingleCardSkeleton />
            <SingleCardSkeleton />
            <SingleCardSkeleton />
            <SingleCardSkeleton />
          </>
        }
      >
        {allDiplomas?.map((diploma) => (
          <DiplomaCard key={diploma.id} diplomas={diploma} />
        ))}
      </InfiniteScroll>

      {hasNextPage ? <ScrollMore /> : <EndList />}
    </div>
  );
}
