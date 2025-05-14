import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserTable } from "@/utils/supabase/actions/userTable";

interface dataType {
  id: string;
  username: string;
}

export function UsernameInput({data}: {data: dataType}) {
  const { id, username } = data;

  const handleSubmit = async (id: string, username: string) => {
    const { success, error } = await updateUserTable({id, "username", username});
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="" placeholder={username} />
      <Button type="submit" onClick={handleSubmit(id, username)}>Oppdater</Button>
    </div>
  );
}
