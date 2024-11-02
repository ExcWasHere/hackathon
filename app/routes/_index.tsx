import type { MetaFunction } from "@remix-run/node";
import Footer from "~/common/footer";
import Header from "~/common/header";
import IndexDiscoverSection from "~/components/index/discover";
import IndexFeatures from "~/components/index/features";
import IndexHero from "~/components/index/hero";
import IndexIntroduction from "~/components/index/intro";
import IndexLogo from "~/components/index/logo";
import IndexReview from "~/components/index/review";
import IndexSupport from "~/components/index/support";
import IndexAdvantage from "~/components/index/why-us";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | TerraTopia" },
    { name: "description", content: "" },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
      <IndexHero />
      <IndexIntroduction />
      <IndexLogo />
      <IndexFeatures />
      <IndexAdvantage />
      <IndexSupport />
      <IndexReview />
      <IndexDiscoverSection />
      <Footer />
    </>
  );
}
