import { ModeToggle } from "./mode-toggle";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex gap-2 py-2 px-2 border-b-[2px] z-30  backdrop-blur-sm w-full fixed items-center justify-between ">
      <svg
        id="logo-35"
        width="50"
        height="39"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {" "}
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          className="ccompli1"
          fill="#007AFF"
        ></path>{" "}
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          className="ccustom"
          fill="#312ECB"
        ></path>{" "}
      </svg>
      <div className="font-bold">Daily Pulse</div>

      <div className="flex gap-2">
        <ModeToggle />
        <SignedIn>
          {/* Mount the UserButton component */}

          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <Button asChild>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
