import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function UsernameInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="" placeholder="Brukernavn" />
      <Button type="submit">Oppdater</Button>
    </div>
  )
}

