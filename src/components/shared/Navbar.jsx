import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const demoProfile =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAMFBMVEXk5ueutLenrrHn6eqrsbS0ubzb3t+2vL7X2tzh4+S7wMPS1de/xMbCx8nIzM6xt7lOagnvAAADuUlEQVR4nO2b23asIAxAgShXhf//24IzPVNbnQGiQddhP/WteyWTcIuMdTqdTqfT6XQ6nU6n06kCWgt8AACYlFprY9Kf1wSYm1XgCyEor68X1hhFrwYx8BeDENbJKwUVQNvxp+K36RAmeR1PqYYNyYcpt+YSomBmseP4DKm/gCi4rXSvRcf2mZ8/SS6ivq2kmXIso+fcVFPlWUbPqV3ezcef5Q9P28wyO5YPzzbxhCLLVEctPMG/bZdbOHpP0KWSEUmuyVS55aCowwmZDfOXJ/HPE2SNJecjcdqrgkm+aroqyYSh1KwMJvGv0xS3zBd0lpC1e9sJJ12Ph/pYEm5Bqhagf5D1JEzOU9aJNI1Fac5EP04ZEJacByJNjQkm54Kow3ukpqbRRFUQ2UIEqAqK0NQQjDhLTnR2wxV6bPA0msicd83/UZNmGYJ7lNBNGhK2vVNtke6xWN5l6+GQmjSWTOJqiKhtMnaPQ8ZNjmwgEZaEl3L3uE64y+UMM/WaVMffhepw0l5rV98iDaTXsHUvBPRPwbVPBKTBrC12yjJ/UrGwt3hdvcljIJTv5xo8rZZXe5uH6tJbY7IN3F8KPBtaQv4hUzQdncnNe8NYLoDPkQxNanzlqT9Opgy2/fAZA+PFO9FBXGGUjyXRie8PRk7XGYoFPW+JDmL0F8j3C2DGKbFOfhraJd63ZQAA2lulxoRS1usrzRWviGJGJgy7rGOK54rWPiuijzFSa+dnq8YwLIRR2Wn2TstLTOpHRb3oDSLZrco8IqKvjbaypSow7dNnA7vT5E9dzqOsa9LjwUhv+dvl528P1YY0qADJ8X0Qt0y5mh2VaPw3btxdHD8zU5zbYiBnjpjpStk//XeavhFBBPJblCt34n4kVnbh1PO+aTjtahv0hMr2GqFOST2w/U1lJerwTR4wX9x/PjNMxwYU5JH5/uF56FkOXDg+lE8O+6QEjD0llA8Grg8RBXlUF9rjiCsw3ExpFkdciSAfz/M8LfJoBxSW6WMN1OJJZIl9yaSyTPGszjtZLB+elWkHd2K73PCc6jRRj/s1nnX9Ezu8Ve5ZsR6hR3NrKC6jisepAyhuS8hZo0qKp2qQc3C1hKK0gyTtRS/KdiFN6udBwbGjTf0sFH0g3i6YPOTf3Zy/E96nYGiFcsvxl2zNlpJc5C6ZulE3epI5twJTU8vclR09144l6yYEN0R6AHn7Tqj/WvogzaxtPOkJaJO8U3ujzdGLrHk/Yxtb5s2omSBak/k1xO+nXGLyJDudTj5fi7gzWTQ3rFAAAAAASUVORK5CYII=";
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
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
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || demoProfile}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          {" "}
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
