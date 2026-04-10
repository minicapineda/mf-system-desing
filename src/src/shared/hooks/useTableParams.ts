import { useSearchParams } from "react-router-dom";

export const useTableParams = (defaultRows: number) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Math.max(0, Number(searchParams.get("page") || "1") - 1);
	const rowsPerPage = Number(searchParams.get("rows") || String(defaultRows));
	const searchTerm = searchParams.get("search") || "";

	const updateParams = (newValues: Record<string, string | number>) => {
		const params = new URLSearchParams(searchParams);
		Object.entries(newValues).forEach(([key, value]) => {
			if (value === "" || value === undefined) {
				params.delete(key);
			} else {
				params.set(key, String(value));
			}
		});
		setSearchParams(params);
	};

	return {
		page,
		rowsPerPage,
		searchTerm,
		onPageChange: (p: number) => updateParams({ page: p + 1 }),
		onSearch: (q: string) => updateParams({ search: q, page: 1 }),
		onRowsPerPageChange: (rpp: number) => updateParams({ rows: rpp, page: 1 }),
	};
};
