import React from "react";
import Footer from "~/common/footer";
import Header from "~/common/header";
import SupportContact from "~/components/support/contact";
import SupportMain from "~/components/support/support";

export default function SupportPage() {
  return (
    <>
      <Header />
      <SupportMain />
      <SupportContact />
      <Footer />
    </>
  );
}
