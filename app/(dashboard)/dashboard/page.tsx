import ECommerce from "@cmp/Dashboard/E-commerce";
import { getServerAuthSession } from "@utils/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default async function Home() {
  const authSession = await getServerAuthSession();
  return (
    <>
      <ECommerce />
    </>
  );
}
