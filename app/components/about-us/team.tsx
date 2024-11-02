import { BiChevronRight } from "react-icons/bi";
const profileList = [
  {
    id: 1,
    name: "Pramudya Surya Anggara Putra",
    job: "Fullstack Developer",
    image: "/about-us/profile/mud.jpg",
  },
  {
    id: 2,
    name: "Farrel M Kafie",
    job: "UI/UX Designer",
    image: "/about-us/profile/farrel.jpg",
  },
  {
    id: 2,
    name: "Excell Christian",
    job: "Frontend Developer",
    image: "/about-us/profile/excell.jpg",
  },
];

export default function AboutUsTeam(): JSX.Element {
  return (
    <div className="h-fit bg-gray-100 py-16 text-black">
      <div className="w-[80vw] mx-auto py-16 flex justify-between">
        <div>
          <h1 className="text-6xl font-semibold">
            Meet Our <br />
            <span className="text-green-600">Amazing Team</span>
          </h1>
          <p className="mt-2 text-xl font-light max-w-xl">
            Unleashing Potential, Driving Transformation: Empowering Minds to
            Innovate, Inspire, and Lead the Future.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-transparent to-transparent rounded-lg opacity-40"></div>
          <img
            src="/about-us/template2.jpeg"
            alt=""
            className="relative z-10 w-[400px] h-[200px] object-cover rotate-3 rounded-lg shadow-lg"
            style={{ objectPosition: "top bottom" }}
          />
        </div>
      </div>

      <div className="flex gap-4 flex-1 grid-cols-3 w-[80vw] mx-auto justify-center items-center">
        {profileList.map((profile) => (
          <div
            key={profile.id}
            className="my-2 mx-auto flex flex-col py-4 shadow-xl px-4 rounded-lg hover:scale-105 transition-all duration-500"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-[350px] h-[350px] object-cover rounded-lg shadow-lg"
            />
            <h1 className="mt-4 text-2xl font-semibold">{profile.name}</h1>
            <h2 className="italic font-light text-sm">{profile.job}</h2>
          </div>
        ))}
      </div>

      <div className="w-[80vw] mx-auto py-16">
        <hr className="border-t-2 border-gray-500 " />
      </div>

      <div className="flex w-[80vw] mx-auto justify-between">
        <h1 className="font-semibold text-6xl">Join our team</h1>
        <div className="">
          <p className="max-w-xl font-light">
            We believe it takes great people to make a great product. That's why
            we hire not only the perfect professional fits, but people who
            embody our company values.
          </p>
          <div className="flex mt-8 items-center text-green-800">
            <button className="text-black underline font-semibold">
              See open options
            </button>
            <BiChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
}
