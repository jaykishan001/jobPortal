import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { logutAuthUser, setAuthUser } from "../../redux/authSlice";
import { toast } from "sonner";
function Navbar() {
  // const user = true;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong while logout user from navbar");
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F89A28]"> Dekho</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Company</Link>
                </li>
                <li>
                  <Link to="admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ??
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start my-3">
                  {user && user.role === "applicant" && (
                    <div className="flex w-fit items-center gap-4 cursor-pointer">
                      <User2Icon />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-4 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#F89A28] text-black hover:bg-[#ed880c]">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
