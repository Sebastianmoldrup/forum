import { Button } from "@/components/ui/button";
import { signout } from "../firebase/client/functions.ts";

export default function ProfilePage() {
  return <div className="">
    <Button className="" onClick={signout()}>Logg ut</Button>
  </div>;
}
