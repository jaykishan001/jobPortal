import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";


function HeroSection() {
  return (
    <div className="text-center">
      <div className=" flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#EC880C]">
          No. 1 job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38c2]">Dream Jobs</span>
        </h1>
        <p>Discover your dream job with us—where passion meets purpose, and every opportunity is a step toward fulfillment.</p>
        <div className="flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input 
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
            />
            <Button className="rounded-r-full bg-[#6A38c2] py-2">
                <Search className="h-5 w-5" />
            </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
