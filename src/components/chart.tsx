import { Card } from "flowbite-react";

export function Chart() {
  return (
    <div className="items-center  h-[1203px]">
      <h1></h1>
      <div className="flex items-center justify-center space-x-2 my-6 mx4">
        <Card href="#" className="w-[303px] h-[404px] bg-transparent">
          <div>
            <img src="/CCR3.png" alt="CCR3" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Routerboard CCR2004-1G-12S+2XS
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            The Connectivity Router - your best companion when it comes to SFP,
            SFP+ and SFP28 management! 1, 10 and 25 Gbps ports in a single
            device to make your life easier
          </p>
          <p className="text-center font-bold">Rp. 8.240.000,00</p>
        </Card>{" "}
        <Card href="#" className="w-[303px] h-[404px] bg-transparent">
          <div>
            <img src="/CCR3.png" alt="CCR3" />
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Routerboard CCR2004-1G-12S+2XS
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            The Connectivity Router - your best companion when it comes to SFP,
            SFP+ and SFP28 management! 1, 10 and 25 Gbps ports in a single
            device to make your life easier
          </p>
          <p className="text-center font-bold">Rp. 8.240.000,00</p>
        </Card>{" "}
        <Card href="#" className="w-[303px] h-[404px] bg-transparent">
          <img src="/CCR3.png" alt="CCR3" />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Routerboard CCR2004-1G-12S+2XS
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            The Connectivity Router - your best companion when it comes to SFP,
            SFP+ and SFP28 management! 1, 10 and 25 Gbps ports in a single
            device to make your life easier
          </p>
          <p className="text-center font-bold">Rp. 8.240.000,00</p>
        </Card>
      </div>
    </div>
  );
}
