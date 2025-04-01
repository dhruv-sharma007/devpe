import React from "react";

const Profile = () => {
	return (
		<div className=" flex flex-col items-center justify-center min-h-screen  p-4">

			<div className="card w-80 md:w-[600px] bg-neutral text-neutral-content p-6 rounded-lg shadow-lg">

				<div className="flex items-center gap-4">

					<div className="avatar">
						<div className="w-20 md:w-32 rounded-full border-4 border-orange-500">
							<span className="flex items-center justify-center w-full h-full bg-orange-700 text-4xl md:text-6xl font-bold text-black">
								Y
							</span>
						</div>
					</div>


					<div>
						<h2 className="text-xl md:text-3xl font-bold text-orange-500">
							Yamdoot
						</h2>
						<p className="text-gray-400 text-sm md:text-base">yamdoot999</p>
					</div>


					<div className="ml-auto">
						<h2 className="text-xl md:text-3xl font-bold text-blue-400">
							Balance <span className="text-green-500">$240</span>
						</h2>
					</div>
				</div>


				<div className="flex justify-center mt-6 gap-4">
					<div className="w-10 h-10 md:w-14 md:h-14 border-2 border-orange-500 rounded-full"></div>
					<div className="w-10 h-10 md:w-14 md:h-14 border-2 border-orange-500 rounded-full"></div>
					<div className="w-10 h-10 md:w-14 md:h-14 border-2 border-orange-500 rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
