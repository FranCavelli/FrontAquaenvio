import LogoutButton from "../components/logout";

export const metadata: Metadata = {
  title: "Cuenta no configurada",
};

export default function Not_configurated_account() {

    return (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-4xl font-bold text-blue-900">CUENTA NO CONFIGURADA</h1>
          <div className="w-full flex flex-col lg:flex-row mt-7">
            <LogoutButton/>
          </div>
        </div>
    );
}
