import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  ChevronDown,
  StarsIcon,
  GraduationCap,
  FileSearch2Icon,
  Route,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";


export default async function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <Image
            src="/Logo1.jpg"
            alt="CareerEdge Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          CareerEdge
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">

          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 md:w-56 w-full">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/roadmap" className="flex items-center gap-2">
                    <Route className="h-4 w-4" />
                    Roadmap Generator
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Build Resume
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/resume-analyser" className="flex items-center gap-2">
                    <FileSearch2Icon className="h-4 w-4" />
                    Resume Analyser
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-2"
                  >
                    <PenBox className="h-4 w-4" />
                    Cover Letter
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Interview Prep
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>
          {/* <ModeToggle /> */}
        </div>
      </nav>
    </header>
  );
}


// this is documentary code for the header component
// The Header component serves as the navigation bar for the CareerEdge application.
// It includes links to the dashboard, growth tools, and user authentication options.
// The header is fixed at the top of the page and adapts to different screen sizes.
// The component uses Clerk for user authentication and provides a dropdown menu for growth tools.
// The header also includes a logo and is styled with Tailwind CSS for responsiveness and aesthetics.


// how clerk works
// Clerk is a user management system that provides authentication and user profile management.
// It allows developers to easily integrate user sign-in, sign-up, and profile management into their applications.
// Clerk provides a simple and secure way to manage user authentication and profiles, making it a popular choic
// e for developers building web applications.
// Clerk's API is used to authenticate users and manage their profiles.

