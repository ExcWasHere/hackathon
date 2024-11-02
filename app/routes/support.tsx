import React from "react";
import Footer from "~/common/footer";
import Header from "~/common/header";
import SupportContact from "~/components/support/contact";
import SupportHero from "~/components/support/hero";
import SupportMain from "~/components/support/support";

export default function SupportPage() {
  return (
    <>
      <Header />
      <SupportHero />
      <SupportMain />
      <SupportContact />
      <Footer />
    </>
  );
}
