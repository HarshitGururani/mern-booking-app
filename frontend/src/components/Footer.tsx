import { Link } from "react-router-dom";
import { Contact, Discover, QuickLinks } from "../constants/footer-constants";
import { CiMail } from "react-icons/ci";
import { MdLocalPhone } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
const Footer = () => {
  return (
    <div className="px-1 py-10 grid grid-cols-2 md:grid-cols-4 gap-5 ">
      <div className="flex flex-col gap-3">
        <Link to={"/"}>
          <h1 className="text-primary font-bold text-3xl tracking-tighter">
            booking<span className="text-black">.com</span>
          </h1>
        </Link>
        <p className="text-muted-foreground text-base tracking-tighter">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </p>
      </div>

      <div>
        <h4 className="font-bold text-lg">Discover</h4>
        <div className="flex flex-col gap-4 mt-5">
          {Discover.map((item, id) => (
            <p key={id} className="text-muted-foreground">
              {item}
            </p>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-bold text-lg">Quick Links</h4>
        <div className="flex flex-col gap-3 mt-5">
          {QuickLinks.map((item, id) => (
            <p key={id} className="text-muted-foreground">
              {item}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-bold text-lg">Quick Links</h4>
        <div className="flex flex-col gap-3 mt-5">
          {Contact.map((item, id) => (
            <div key={id}>
              {item.address && (
                <div className="flex gap-1 items-center">
                  <LuMapPin className="text-primary size-5" />
                  <span className="font-bold">Address:</span>{" "}
                  <span className="font-normal text-muted-foreground">
                    {item.address}
                  </span>
                </div>
              )}

              {item.Email && (
                <div className="flex gap-1 items-center">
                  <CiMail className="text-primary size-5" />
                  <span className="font-bold">Email:</span>{" "}
                  <a
                    href={`mailto:${item.Email}`}
                    target="_blank"
                    className="text-muted-foreground text-base"
                  >
                    {item.Email}
                  </a>
                </div>
              )}

              {item.Phone && (
                <div className="flex gap-1 items-center">
                  <MdLocalPhone className="text-primary size-5" />
                  <span className="font-bold">Phone:</span>{" "}
                  <span className="font-normal text-muted-foreground">
                    {item.Phone}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Footer;
