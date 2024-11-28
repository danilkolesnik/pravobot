'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@component/ui/loader";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  },[]);

  return <Loader />;
}
