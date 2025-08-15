import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Save } from "lucide-react";

interface CollegeBuildingFormProps {
  onSubmit: (data: CollegeBuildingFormData) => void;
}

interface CollegeBuildingFormData {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  category?: string;
}

const CollegeBuildingForm = ({ onSubmit }: CollegeBuildingFormProps) => {
  const [formData, setFormData] = useState<CollegeBuildingFormData>({
    name: "",
    description: "",
    latitude: 0,
    longitude: 0,
    category: "",
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
        name: "",
        description: "",
        latitude: 0,
        longitude: 0,
        category: "",
      });
    }
  };

  const handleInputChange = (field: keyof CollegeBuildingFormData, value: string | number) => {
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
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="building-name" className="text-foreground/90">
            Building Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="building-name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-glass"
            placeholder="Enter building name"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-foreground/90">
            Category (Optional)
          </Label>
          <Input
            id="category"
            type="text"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="input-glass"
            placeholder="e.g., Academic, Administrative, Recreation"
          />
        </div>

        {/* Latitude */}
        <div className="space-y-2">
          <Label htmlFor="building-latitude" className="text-foreground/90">
            Latitude <span className="text-destructive">*</span>
          </Label>
          <Input
            id="building-latitude"
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
          <Label htmlFor="building-longitude" className="text-foreground/90">
            Longitude <span className="text-destructive">*</span>
          </Label>
          <Input
            id="building-longitude"
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
        <Label htmlFor="building-description" className="text-foreground/90">
          Description (Optional)
        </Label>
        <Textarea
          id="building-description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="input-glass resize-none"
          placeholder="Enter building description, facilities, or other details..."
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="gradient-secondary" className="px-8">
          <Save className="mr-2 h-4 w-4" />
          Create Building
        </Button>
      </div>
    </form>
  );
};

export default CollegeBuildingForm;