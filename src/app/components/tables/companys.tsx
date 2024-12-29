'use client'

import Datatable from "@/app/components/datatable";
import { useCompany } from "@/app/hooks/company";
import { useEffect, useState } from "react";

export default function TablesCompany() {

    const { getCompanys } = useCompany();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCompanys();
                setData(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {name: "ID", uid: "id"},
        {name: "NOMBRE", uid: "name", sortable: true}, 
        {name: "ESTADO", uid: "status", sortable: true},
        {name: "", uid: "actions"},
    ]
    
    const initialColumns = ["name", "lastname", "status", "actions"];

    return (
        <div className="w-1/2 bg-white p-2 rounded-md">
          <h2>EMPRESAS</h2>
          <Datatable data={data} columns={columns} initialColumns={initialColumns} controler={'user'}/>
        </div>
    );
}
