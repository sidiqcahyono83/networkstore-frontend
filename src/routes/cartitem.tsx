export const Cartitem = () => {
	return (
		<div className=" my-6 mx-6">
			<div className="max-w-sm">
				<div className="mb-4 flex items-center justify-between">
					<h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
						Latest Cart
					</h5>
					<a
						href="#"
						className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
					>
						View all
					</a>
				</div>
				<div className="flow-root">
					<ul className="divide-y divide-gray-200 dark:divide-gray-700">
						<li className="py-3 sm:py-4">
							<div className="flex items-center space-x-4">
								<div className="shrink-0">
									<img
										alt="CCR"
										height="32"
										src="/CCR.png"
										width="32"
										className="rounded-full"
									/>
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
										CCR 2024
									</p>
									<p className="truncate text-sm text-gray-500 dark:text-gray-400">
										===
									</p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									8240000
								</div>
							</div>
						</li>
						<li className="py-3 sm:py-4">
							<div className="flex items-center space-x-4">
								<div className="shrink-0">
									<img
										alt="Bonnie image"
										height="32"
										src="/4011.png"
										width="32"
										className="rounded-full"
									/>
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-medium text-gray-900 dark:text-white">
										RB 4011
									</p>
									<p className="truncate text-sm text-gray-500 dark:text-gray-400">
										email@windster.com
									</p>
								</div>
								<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
									350000
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
