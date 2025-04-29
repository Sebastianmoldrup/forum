import { Button } from "@/components/ui/button";
import { signout } from "../firebase/functions";

export default function ProfilePage() {
  return <div className="">
    <Button className="" onClick={signout()}>Logg ut</Button>
  </div>;
}
