import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Save } from "lucide-react";

interface MarkerFormProps {
  onSubmit: (data: MarkerFormData) => void;
}

interface MarkerFormData {
  building?: string;
  latitude: number;
  longitude: number;
  name: string;
  description?: string;
  created_by?: string;
}

// Mock data for dropdowns
const mockBuildings = [
  { id: "1", name: "Main Library" },
  { id: "2", name: "Science Building" },
  { id: "3", name: "Student Center" },
  { id: "4", name: "Engineering Hall" },
];

const mockUsers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Admin User" },
];

const MarkerForm = ({ onSubmit }: MarkerFormProps) => {
  const [formData, setFormData] = useState<MarkerFormData>({
    building: "",
    latitude: 0,
    longitude: 0,
    name: "",
    description: "",
    created_by: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.latitude || isNaN(formData.latitude)) {
      newErrors.latitude = "Valid latitude is required";
    }

    if (!formData.longitude || isNaN(formData.longitude)) {
      newErrors.longitude = "Valid longitude is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        building: "",
        latitude: 0,
        longitude: 0,
        name: "",
        description: "",
        created_by: "",
      });
    }
  };

  const handleInputChange = (field: keyof MarkerFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Building Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="building" className="text-foreground/90">
            Building (Optional)
          </Label>
          <Select
            value={formData.building}
            onValueChange={(value) => handleInputChange("building", value)}
          >
            <SelectTrigger className="input-glass">
              <SelectValue placeholder="Select a building" />
            </SelectTrigger>
            <SelectContent className="glass-card border-0">
              {mockBuildings.map((building) => (
                <SelectItem key={building.id} value={building.id}>
                  {building.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Created By Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="created_by" className="text-foreground/90">
            Created By (Optional)
          </Label>
          <Select
            value={formData.created_by}
            onValueChange={(value) => handleInputChange("created_by", value)}
          >
            <SelectTrigger className="input-glass">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent className="glass-card border-0">
              {mockUsers.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground/90">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-glass"
            placeholder="Enter marker name"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>

        {/* Latitude */}
        <div className="space-y-2">
          <Label htmlFor="latitude" className="text-foreground/90">
            Latitude <span className="text-destructive">*</span>
          </Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={formData.latitude || ""}
            onChange={(e) => handleInputChange("latitude", parseFloat(e.target.value) || 0)}
            className="input-glass"
            placeholder="e.g., 40.7128"
          />
          {errors.latitude && (
            <p className="text-destructive text-sm">{errors.latitude}</p>
          )}
        </div>

        {/* Longitude */}
        <div className="space-y-2">
          <Label htmlFor="longitude" className="text-foreground/90">
            Longitude <span className="text-destructive">*</span>
          </Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={formData.longitude || ""}
            onChange={(e) => handleInputChange("longitude", parseFloat(e.target.value) || 0)}
            className="input-glass"
            placeholder="e.g., -74.0060"
          />
          {errors.longitude && (
            <p className="text-destructive text-sm">{errors.longitude}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground/90">
          Description (Optional)
        </Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="input-glass resize-none"
          placeholder="Enter marker description..."
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="default" className="px-8">
          <Save className="mr-2 h-4 w-4" />
          Create Marker
        </Button>
      </div>
    </form>
  );
};

export default MarkerForm;