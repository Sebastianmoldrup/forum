import { createClient } from "@/utils/supabase/server";

// Define interface for user table columns
interface UserColumns {
  id: number;
  name: string;
  email: string;
  created_at: string;
  // Add any other columns your users table has
}

// This type creates a function parameter type that ensures:
// 1. columnName is a valid key from UserColumns
// 2. newValue matches the type of the chosen column
type UpdateUserParams<K extends keyof UserColumns = keyof UserColumns> = {
  userId: number;
  columnName: K;
  newValue: UserColumns[K];
};

export const updateUserTable = async <K extends keyof UserColumns>({
  userId,
  columnName,
  newValue,
}: UpdateUserParams<K>): Promise<{ success: boolean; error: boolean }> => {
  const supabase = await createClient();

  // The typing ensures this is safe
  const updateData = { [columnName]: newValue } as Pick<UserColumns, K>;

  const { data, error } = await supabase
    .from("users")
    .update(updateData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating user table:", error);
    return { success: false, error: true };
  }
  console.log("User table updated successfully:", data);

  return { success: true, error: false };
};
