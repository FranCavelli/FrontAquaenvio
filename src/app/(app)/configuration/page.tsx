import TablesUsers from "@/app/components/tables/users";
import TablesRoles from "@/app/components/tables/roles";
import type { Metadata } from "next";
import TablesCompany from "@/app/components/tables/companys";

export const metadata: Metadata = {
  title: "Configuración",
};

export default function Configuration_aquaenvio() {

    return (
        <div>
          <h1>CONFIGURACIÓN AQUAENVIO</h1>
          <div className="flex flex-wrap p-3 rounded-lg shadow-sm">
            <TablesUsers />
            <TablesRoles />
            <TablesCompany />
          </div>
        </div>
    );
}
