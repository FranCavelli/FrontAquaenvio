'use client'; // Asegúrate de que esto esté al inicio del archivo

import { useState, useEffect } from 'react';
import { useCompany } from '../../hooks/company'

interface Company {
  id: string;
  name: string;
}

export default function Select_company() {

    const { companiesByUser } = useCompany();
    const [companys, setCompanys] = useState([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      companiesByUser()
          .then((data) => {
              setCompanys(data);
              setError(data.message);
          })
          .catch((err) => {
            setError(err);
          });
  }, []);

    return (
        <div className="w-full h-full flex flex-col">
          <h1 className="text-4xl font-bold text-blue-900">SELECCIONAR EMPRESA</h1>
          <div className="w-full h-full flex flex-col mt-7">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              companys.map((company: Company) => (
                <div className="w-full" key={company.id}>
                  <a>{company.name}</a>
                </div>
              ))
            )}
          </div>
        </div>
    );
}
