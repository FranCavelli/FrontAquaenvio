'use client'

import Datatable from "@/app/components/datatable";
import { useUsers } from "@/app/hooks/users";
import { useRoles } from "@/app/hooks/roles";
import { useEffect, useState } from "react";

export default function TablesUsers() {

    const { getUsers } = useUsers();
    const { getRoles } = useRoles();
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataRoles = await getRoles();
                const dataUsers = await getUsers();
                setUsers(dataUsers);
                setRoles(dataRoles);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { name: "ID", uid: "id" },
        { name: "NOMBRE", uid: "name", sortable: true },
        { name: "ROL", uid: "role", sortable: true },
        { name: "ESTADO", uid: "status", sortable: true },
        { name: "", uid: "actions" },
    ]

    const inputs = [
        { name: "cuit", type: "text", placeholder: "CUIT", required: true },
        { name: "lastname", type: "text", placeholder: "Apellido", required: true },
        { name: "name", type: "text", placeholder: "Nombre", required: true },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "telephone", type: "text", placeholder: "Telefono", required: true },
        { name: "role", type: "select", placeholder: "Rol", options: roles, required: true }
    ]

    const initialColumns = ["name", "lastname", "role", "status", "actions"];

    return (
        <div className="w-full 2xl:w-1/2 p-1 rounded-md">
            <div className="p-2 bg-white">
                <h2 className='py-1 text-xl font-semibold'>USUARIOS</h2>
                <Datatable data={users} columns={columns} initialColumns={initialColumns} controler={'user'} new='newUser' inputs={inputs}/>
            </div>
        </div>
    );
}
