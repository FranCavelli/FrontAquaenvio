'use client'; // Asegúrate de que esto esté al inicio del archivo

import { useState, useEffect } from 'react';
import { useCompany } from '../../hooks/company'
import CompanyButton from './companyButton';
import { useRouter } from 'next/navigation'

interface Company {
  id: string;
  name: string;
}

export default function Companies() {
  const router = useRouter()

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
  if(error) {
    router.push('/not-configurated-account');
  }

    return (
        <>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              companys.map((company: Company) => (
                <CompanyButton key={company.id} id={company.id} company={company.name} />
              ))
            )}
        </>
    );
}
