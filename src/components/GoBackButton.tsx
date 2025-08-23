"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function GoBackButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <Button
      title={label}
      className='pointer-events-auto w-auto'
      onClick={() => router.back()}
    />
  );
}