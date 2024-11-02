import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function AboutUsPage() {
  return (
    <>
      <section className="h-screen container mx-auto text-center">
        <div className="text-5xl font-bold mb-4">
          <h2>TerraTopia</h2>

          <p className="text-lg mb-8">
            TerraTopia adalah asisten pertanian lengkap. Kami memanfaatkan
            teknologi AI mutakhir untuk membantu Anda mengelola pertanian,
            mengoptimalkan performa tanaman, dan selalu mengikuti tren pasar.
          </p>

        <img src="" alt="" />
        </div>
      </section>
    </>
  );
}
