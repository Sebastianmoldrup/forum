import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserTable } from "@/utils/supabase/actions/userTable";

export function EmailInput() {
  const handleSubmit = async () => {
    const { success, error } = await updateUserTable({});
    console.log("Success:", success);
    console.log("Error:", error);
    return;
  };
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit" onClick={() => handleSubmit()}>
        Oppdater
      </Button>
    </div>
  );
}
