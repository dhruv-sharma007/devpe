import React from "react";
import { CgProfile } from "react-icons/cg";
import { RiMoneyRupeeCircleLine, RiBankFill } from "react-icons/ri";
import { TbUserSearch } from "react-icons/tb";

const Hero = () => {
	return (
		<div className="w-full flex flex-col items-center">
			
			<div className=" pt-5">
				<img
					src="/banner.png"
					alt="Hero Banner"
					className="w-full max-h-[500px] object-cover"
				/>
			</div>

			<div className="flex justify-around items-center w-[25rem] rounded-md max-w-4xl py-6 border-2 m-2	">
				{[
					<CgProfile key="profile" />,
					<RiMoneyRupeeCircleLine key="money" />,
					<RiBankFill key="bank" />,
					<TbUserSearch key="search" />,
				].map((icon, index) => (
					<div
						key={index}
						className="text-6xl text-gray-700 hover:text-blue-500 transition duration-300">
						{icon}
					</div>
				))}
			</div>
		</div>
	);
};

export default Hero;
