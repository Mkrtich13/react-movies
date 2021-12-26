import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  MouseEventHandler,
  useRef,
} from "react";

type Props = {
  data: any[];
  itemsPerPage: number;
  containerClassName?: string;
  renderItem: (value: any, index: number, array: any[]) => JSX.Element;
};

const Pagination = ({
  data,
  itemsPerPage,
  containerClassName,
  renderItem,
}: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "nearest",
    });
  }, [currentPage]);

  const totalPage = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  const currentData = useMemo(() => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const setPrevPage = useCallback(() => {
    if (!data.length || currentPage <= 1) {
      return;
    }
    setCurrentPage((page) => page - 1);
  }, [currentPage, data.length]);

  const setNextPage = useCallback(() => {
    if (!data.length || currentPage >= totalPage) {
      return;
    }
    setCurrentPage((page) => page + 1);
  }, [currentPage, totalPage, data.length]);

  useEffect(() => {
    if (!currentData.length && data.length) {
      setPrevPage();
    }
  }, [currentData, data, setPrevPage]);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPage;

  return (
    <section>
      <div ref={containerRef} className={containerClassName}>
        {currentData.map(renderItem)}
      </div>
      <div className="mt-5">
        {totalPage > 1 && (
          <div className="flex justify-center">
            <PaginationButton
              label="< précédent"
              onClick={setPrevPage}
              disabled={!hasPreviousPage}
            />
            <PaginationButton
              label="suivant >"
              onClick={setNextPage}
              disabled={!hasNextPage}
            />
          </div>
        )}
        {!!totalPage && (
          <p className="text-center py-5">
            {currentPage} / {totalPage}
          </p>
        )}
      </div>
    </section>
  );
};

const PaginationButton = ({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`mx-3 ${disabled && "opacity-25"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Pagination;
