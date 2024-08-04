import useGet from "@/hooks/useGet";
import { MultiSelect } from "@mantine/core";
import React, { FC, useEffect } from "react";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string[];
  datasrc: string;
  accessorKey?: string;
  labelKey?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
  variant?: "filled" | "unstyled" | "default";
  filterData?: (data: any[]) => any[];
  setData?: (data: any[]) => void;
  data?: any[];
}

const AsyncMultiSelect: FC<Props> = ({
  label,
  labelKey,
  accessorKey,
  placeholder,
  value,
  datasrc,
  onChange,
  disabled,
  variant,
  filterData,
  setData,
  data: dataProp,
}) => {
  const [selected, setSelected] = React.useState<string[]>(value ?? []);
  const { data, loading, get } = useGet<any[]>(datasrc, { defaultData: [] });
  const [selectedData, setSelectedData] = React.useState<any[]>([]);

  useEffect(() => {
    console.log("data", data);
    setData?.(data ?? []);

    // used set to remove duplicates
    const combData = [...(dataProp ?? []), ...(data ?? [])];
    const dataSet = new Set(combData.map((item) => JSON.stringify(item)));
    const _data = Array.from(dataSet).map((item) => JSON.parse(item));

    const newData = filterData ? filterData(_data ?? []) : _data;
    const selectData = newData?.map((item) => ({
      value: item[accessorKey ?? "id"]?.toString(),
      label: item[labelKey ?? "name"]?.toString(),
    }));
    setSelectedData(selectData ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessorKey, data, labelKey, value]);
  const loadingData = [
    { value: "loading", label: "Loading...", disabled: true },
  ];

  useEffect(() => {
    if (!datasrc) return;
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasrc]);

  return (
    <MultiSelect
      label={label}
      placeholder={placeholder}
      variant={variant ?? "unstyled"}
      //   px={6}
      searchable
      data={loading ? loadingData : selectedData}
      value={loading ? ["loading..."] : selected}
      nothingFoundMessage="No data found"
      onChange={(e) => {
        // const selected = data?.find((item) => item[accessorKey ?? 'id'] === e);
        console.log("e", e);
        setSelected(e!);
        onChange?.(e);
      }}
      disabled={disabled}
    />
  );
};

export default AsyncMultiSelect;
