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
    <div className="flex gap-2 py-2 px-2 border-b-[2px] items-center justify-between ">
      <div className="font-bold">Daily Pulse</div>

      <div className="flex gap-2">
        <ModeToggle />
        <SignedIn>
          {/* Mount the UserButton component */}

          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;
