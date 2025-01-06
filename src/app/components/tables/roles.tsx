'use client'

import Datatable from "@/app/components/datatable";
import { useRoles } from "@/app/hooks/roles";
import { useEffect, useState } from "react";

export default function TablesRoles() {

    const { getRoles } = useRoles();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoles();
                console.log(data);
                setData(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { name: "ID", uid: "id" },
        { name: "NOMBRE", uid: "name", sortable: true },
        { name: "", uid: "actions" },
    ]

    const initialColumns = ["name", "actions"];

    return (
        <div className="w-full 2xl:w-1/2 p-1 rounded-md">
            <div className="p-2 bg-white">
                <h2 className='py-1 text-xl font-semibold'>ROLES</h2>
                <Datatable data={data} columns={columns} initialColumns={initialColumns} controler={'user'} />
            </div>
        </div>
    );
}
