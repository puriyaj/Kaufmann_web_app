import ECommerce from "@cmp/Dashboard/E-commerce";
import { getServerAuthSession } from "@utils/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Just for Admins",
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
