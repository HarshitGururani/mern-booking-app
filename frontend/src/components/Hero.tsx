import Hotel1 from "../assets/hotel1.jpg";
import Hotel2 from "../assets/hotel2.jpg";
import Hotel3 from "../assets/hotel3.jpg";
const Hero = () => {
  return (
    <div className="flex justify-center mt-10 mb-20">
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col gap-2 md:gap-4">
        <h2 className="text-3xl md:text-[40px] font-bold leading-tight">
          Seamless Stays, Memorable{" "}
          <span className="text-primary">Experiences</span>
        </h2>
        <p className="text-muted-foreground mt-4 md:mt-8 tracking-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsa
          quibusdam nemo neque similique assumenda quas ipsam incidunt, in
          voluptatem! Itaque corrupti praesentium.quas ipsam incidunt, in
          voluptatem
        </p>

        <div className="mt-10">search bar</div>
      </div>

      <div className="hidden md:flex gap-4 flex-1">
        <div className="w-full h-[250px] rounded overflow-hidden">
          <img src={Hotel3} alt="" />
        </div>
        <div className="w-full h-[230px] rounded mt-20 overflow-hidden">
          <img src={Hotel2} alt="" />
        </div>
        <div className="w-full h-[250px] rounded mt-40 overflow-hidden">
          <img src={Hotel1} alt="" />
        </div>
      </div>
    </div>
  );
};
export default Hero;
