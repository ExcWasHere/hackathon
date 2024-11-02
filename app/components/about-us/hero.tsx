import { Link } from "@remix-run/react";

export default function AboutUsHero() {
  return (
    <div className="h-[40vh] relative">
      <img
        src="/about-us/hero.jpg"
        alt=""
        className="absolute inset-0 object-cover h-full w-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
    </div>
  );
}
