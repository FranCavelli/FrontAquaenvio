import Companies from "@/app/components/select_company/companies";


export default function Select_company() {

    return (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-4xl font-bold text-blue-900">SELECCIONAR EMPRESA</h1>
          <div className="w-full flex flex-col lg:flex-row mt-7">
            <Companies />
          </div>
        </div>
    );
}
