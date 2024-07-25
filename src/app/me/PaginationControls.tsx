"use client";

import { Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
}

const PaginationControls = ({ totalPages, currentPage }: PaginationControlsProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="mt-4 flex justify-center">
      <Pagination
        isCompact
        showControls
        onChange={handlePageChange}
        total={totalPages}
        initialPage={currentPage}
      />
    </div>
  );
};

export default PaginationControls;
