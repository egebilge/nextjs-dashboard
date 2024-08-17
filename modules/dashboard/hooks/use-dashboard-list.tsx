import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/api";

function useDashboardList() {
  const { data, isLoading: isDashboardListLoading } = useQuery({
    queryKey: ["dashboardList"],
    queryFn: async () => {
      try {
        const { data } = await API.post("/Procedure/StpRmforKlasik_2", {
          db_Id: 9,
          xRez_Sirket: 9,
          xBas_Tar: "2024-06-01",
          xBit_Tar: "2024-06-10",
          xtip: 1,
          kon1: "ALL",
          kon2: "BB",
          xchkFis_Fazla_otel_10: 0,
          bas_Yil: 2022,
          bit_Yil: 2022,
          fisrci_Kapalioda_10: 0,
          xRez_C_W: "C",
          xSistem_Tarihi: "2024-01-01",
          xAlis_Tarihi: "2024-01-01",
          sistem_Bas1: "2020-01-01",
          sistem_Bit1: "2029-01-01",
          pmdahil_10: 0,
          tip_1: "001",
          xFis_Bela_tutar_10: 0,
          trace_Dus_10: 0,
          cev_01: null,
        });

        return data.value;
      } catch (error) {
        console.error("API call failed:", error);
        throw new Error("Failed to fetch dashboard list");
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isDashboardListLoading,
  };
}

export { useDashboardList };
