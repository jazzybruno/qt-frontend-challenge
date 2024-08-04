import { ApiResponse, IPaginatedQuery, IPagination } from "@/types/base.type";
import { AuthAPi, api, getResError } from "@/utils/fetcher";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

type Opts = {
  /**
   * Fetch data on mount
   * @default true
   */
  onMount?: boolean;
  /**
   * Default data
   */
  defaultData?: any;
  paginated?: boolean;
  pagination?: {
    url?: string;
  };
};

export default function useGet<T = any>(url: string, options?: Opts) {
  const { onMount = true, defaultData, pagination, paginated } = options ?? {};
  const [data, setData] = useState<T | null>(defaultData ?? null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [paginateOpts, setPaginateOpts] = useState<
    IPaginatedQuery
  >({
    limit: 10,
    page: 0
  });

  async function get() {
    setLoading(true);
    setError(null);
    console.log("useGet url", url);
    try {
      const response = await AuthAPi.get<ApiResponse<T>>(url);
      console.log("useGet response", response.data);
      setData(response.data?.payload);
      console.log("useGet data", JSON.parse(JSON.stringify(response.data)));
    } catch (error: any) {
      const err = getResError(error);
      console.log("useGet error", err);
      notifications.show({
        title: "Failed to get data",
        message: err,
        color: "red",
      });
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }

  const getPaginated = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AuthAPi.get(pagination?.url ?? url, {
        params: paginateOpts,
      });
      console.log("getPaginated", response.data);
      const data: IPagination = response.data?.data ?? response.data;
      setData((data?.content as any) ?? defaultData);
      setPaginateOpts((prev) => ({
        ...prev,
      }));
    } catch (error: any) {
      const err = getResError(error);
      console.log("useGet error", error);
      notifications.show({
        title: "Failed to get data",
        message: err,
        color: "red",
      });
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pagination?.url || paginated) return;
    if (onMount) get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMount]);

  useEffect(() => {
    if (pagination?.url || paginated) getPaginated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginateOpts.page, paginateOpts.limit]);

  return {
    data,
    loading,
    error,
    get,
    setData,
    paginateOpts,
    setPaginateOpts,
    getPaginated,
  };
}
