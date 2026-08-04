import { AiOutlineSafety } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../../assets/shopXLogo.png";
import LocationBtn from "../buttons/Location.button";
import { IoSearchSharp } from "react-icons/io5";

import { IoBagHandleOutline } from "react-icons/io5";
import OpenAccountBtn from "../buttons/OpenAccount.button";

const Header = () => {
  return (
    <header>
      {/* Top Strip */}
      <div className="bg-blue-800 py-2">
        <div className="max-w-[1280px] mx-auto px-4">
          <p className="text-center text-xs sm:text-sm font-medium text-white">
            Due to the <span className="font-bold">COVID-19</span> epidemic,
            orders may be processed with a slight delay.
          </p>
        </div>
      </div>

      {/* Top Header */}
      <div className="border-b border-gray-200 hidden lg:block">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center">
            {/* Left Section */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 py-3 md:border-r md:border-gray-200">
              <a
                href="#"
                className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                About Us
              </a>

              <a
                href="#"
                className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                My Account
              </a>

              <a
                href="#"
                className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Wishlist
              </a>

              <a
                href="#"
                className="text-xs font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Order Tracking
              </a>
            </div>

            {/* Center Section */}
            <div className="flex items-center justify-center gap-2 py-3 text-center md:border-r md:border-gray-200">
              <AiOutlineSafety className="text-xl text-green-600 flex-shrink-0" />

              <p className="text-xs font-medium text-gray-700">
                100% Secure delivery without contacting the courier
              </p>
            </div>

            {/* Right Section */}
            <div className="flex justify-center md:justify-end py-3">
              <p className="text-xs font-medium text-gray-700">
                Need help? Call us:{" "}
                <a
                  href="tel:180050007000"
                  className="text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
                >
                  1800 5000 7000
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto flex items-center max-w-[1280px] mx-auto  gap-12">
        <div className="">
          <Link to={"/"}>
            <img className="h-30 w-60" src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="">
          <LocationBtn />
        </div>

        <div className="bg-gray-100 flex flex-1 items-center rounded-lg px-6">
          <input
            className="outline-none h-full w-full border-none bg-transparent text-gray-500 font-semibold p-4  font-semibold"
            type="search"
            placeholder="Search for products..."
          />
          <IoSearchSharp className="text-2xl hover:cursor-pointer" />
        </div>

        <div className="flex items-center justify-between gap-4 cursor-pointer">
          <OpenAccountBtn />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full cursor-pointer bg-red-100">
            <IoBagHandleOutline className="text-2xl text-red-600" />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
              100
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
