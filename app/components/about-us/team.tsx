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
    job: "Frontend Developer and Designer",
    image: "/about-us/profile/farrel.jpg",
  },
  {
    id: 2,
    name: "Excell Christian",
    job: "Frontend Developer and Designer",
    image: "/about-us/profile/excell.jpg",
  },
];

export default function AboutUsTeam(): JSX.Element {
  return (
    <div className="h-fit bg-gray-100 py-16 text-black">
      <div className="w-[80vw] mx-auto py-16 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-semibold">
            Meet Our <br />
            <span className="text-amber-600">Amazing Team</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl font-light max-w-xl">
            Unleashing Potential, Driving Transformation: Empowering Minds to
            Innovate, Inspire, and Lead the Future.
          </p>
        </div>
        <div className="relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-transparent to-transparent rounded-lg opacity-40"></div>
          <img
            src="/about-us/templateTeam.jpeg"
            alt=""
            className="relative z-10 w-[300px] h-[150px] md:w-[400px] md:h-[200px] object-cover rotate-3 rounded-lg shadow-lg"
            style={{ objectPosition: "top bottom" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[80vw] mx-auto justify-center items-center">
        {profileList.map((profile) => (
          <div
            key={profile.id}
            className="my-2 mx-auto flex flex-col py-4 shadow-xl px-4 rounded-lg hover:scale-105 transition-all duration-500"
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] object-cover rounded-lg shadow-lg mx-auto"
            />
            <h1 className="mt-4 text-xl md:text-2xl font-semibold text-center">
              {profile.name}
            </h1>
            <h2 className="italic font-light text-sm text-center">
              {profile.job}
            </h2>
          </div>
        ))}
      </div>

      <div className="w-[80vw] mx-auto py-16">
        <hr className="border-t-2 border-gray-500 " />
      </div>

      <div className="w-[80vw] mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-semibold text-4xl md:text-6xl text-center md:text-left mb-8 md:mb-0">
          Join our team
        </h1>
        <div className="text-center md:text-left">
          <p className="max-w-xl font-light mb-8 md:mb-0">
            We believe it takes great people to make a great product. That's why
            we hire not only the perfect professional fits, but people who
            embody our company values.
          </p>
          <div className="flex mt-8 md:mt-0 items-center justify-center md:justify-start text-amber-800">
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
