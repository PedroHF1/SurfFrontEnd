import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddBeach, Beach } from "@/interfaces/beach"
import { Plus } from "lucide-react"
import { useState } from "react"

interface AddBeachDialogProps {
  onAddBeach: (beach: AddBeach) => void
}

export function AddBeachDialog({ onAddBeach }: AddBeachDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [newBeach, setNewBeach] = useState({
    name: "",
    position: '',
    lat: "",
    lng: "",
  })

  const handleSubmit = () => {
    if (newBeach.name && newBeach.lat && newBeach.lng) {
      const beach = {
        name: newBeach.name,
        lat: Number.parseFloat(newBeach.lat),
        lng: Number.parseFloat(newBeach.lng),
        position: newBeach.position
      }
      onAddBeach(beach)
      setNewBeach({ name: "", lat: "", lng: "", position: '' })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Beach
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>Add New Beach</DialogTitle>
          <DialogDescription className="text-slate-400">
            Register a new surf spot to track conditions
          </DialogDescription>
        </DialogHeader>
        <div className="grid  gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Beach Name</Label>
            <Input
              id="name"
              value={newBeach.name}
              onChange={(e) => setNewBeach({ ...newBeach, name: e.target.value })}
              className="bg-slate-700 border-slate-600"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Beach Position</Label>
            <Input
              id="position"
              value={newBeach.position}
              onChange={(e) => setNewBeach({ ...newBeach, position: e.target.value })}
              className="bg-slate-700 border-slate-600"
            />
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={newBeach.lat}
                onChange={(e) => setNewBeach({ ...newBeach, lat: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={newBeach.lng}
                onChange={(e) => setNewBeach({ ...newBeach, lng: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)} className="border-slate-600">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
            Add Beach
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
