import { fetchCustomersPages } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Customers',
};

interface Props {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
    <section className="w-full">
      <header className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </header>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-4 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
};

export default Page;
