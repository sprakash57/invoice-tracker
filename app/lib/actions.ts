'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer' }),
  amount: z.coerce.number().gt(0, 'Please enter a amount greater than $0'),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type FormState = {
  message?: string | null;
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
};

export const createInvoice = async (
  prevState: FormState,
  formData: FormData,
) => {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    status: formData.get('status'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create invoice',
    };
  }

  const { customerId, status, amount } = validatedFields.data;
  const amountInCents = amount * 100;
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${currentDate})
  `;
  } catch (error) {
    return { message: 'DB Error: Failed to Create invoice' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
};

export const updateInvoice = async (
  id: string,
  prevState: FormState,
  formData: FormData,
) => {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    status: formData.get('status'),
    amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing field. Failed to Update invoice',
    };
  }

  const { customerId, status, amount } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id} 
    `;
  } catch (error) {
    return { message: 'DB Error: Failed to update invoice' };
  }

  revalidatePath('/dashboard/invoices');
  // redirect works by throwing an error, which would be caught by catch block. To avoid this call it after try/catch
  redirect('/dashboard/invoices');
};

export const deleteInvoice = async (id: string) => {
  try {
    await sql`DELETE FROM invoices where id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'DB Error: Failed to delete invoice' };
  }
};
