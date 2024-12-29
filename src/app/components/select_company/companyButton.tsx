import { useSession } from "@/app/hooks/session";

export default function CompanyButton(props: { id: string; company: string }) {

    const { setSessionValue } = useSession();

    const setCompanyUser = async (id:string) => {

        await setSessionValue('company_id', id);
    };

    return (
        <a
            className="w-full bg-white m-2 p-3 shadow-sm cursor-pointer"
            onClick={() => setCompanyUser(props.id)}
        >
            {props.company}
        </a>
    );
}
