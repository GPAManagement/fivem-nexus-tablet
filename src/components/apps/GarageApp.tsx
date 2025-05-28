
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, Fuel, MapPin } from "lucide-react";

interface GarageAppProps {
  onBack: () => void;
}

const GarageApp = ({ onBack }: GarageAppProps) => {
  const vehicles = [
    {
      id: 1,
      name: "Mein Sultan",
      model: "Karin Sultan",
      status: "verfügbar",
      fuel: 85,
      location: "Garage Vinewood",
      mileage: 15420
    },
    {
      id: 2,
      name: "Sportauto",
      model: "Pegassi Zentorno",
      status: "verfügbar",
      fuel: 92,
      location: "Garage Downtown",
      mileage: 8750
    },
    {
      id: 3,
      name: "Motorrad",
      model: "Nagasaki Carbon RS",
      status: "werkstatt",
      fuel: 45,
      location: "LS Customs",
      mileage: 45210
    },
    {
      id: 4,
      name: "Alltagsauto",
      model: "Vapid Dominator",
      status: "verfügbar",
      fuel: 78,
      location: "Garage Paleto Bay",
      mileage: 23100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verfügbar": return "bg-green-600";
      case "werkstatt": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getFuelColor = (fuel: number) => {
    if (fuel > 70) return "text-green-400";
    if (fuel > 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Meine Fahrzeuge</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {vehicles.filter(v => v.status === "verfügbar").length}
            </p>
            <p className="text-sm text-gray-400">Verfügbar</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {vehicles.filter(v => v.status === "werkstatt").length}
            </p>
            <p className="text-sm text-gray-400">In Werkstatt</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{vehicles.length}</p>
            <p className="text-sm text-gray-400">Gesamt</p>
          </div>
        </Card>
      </div>

      {/* Vehicle List */}
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Car className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <p className="text-gray-400">{vehicle.model}</p>
                </div>
              </div>
              <Badge className={getStatusColor(vehicle.status)}>
                {vehicle.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <Fuel className={`w-4 h-4 ${getFuelColor(vehicle.fuel)}`} />
                <span className="text-sm">
                  <span className={getFuelColor(vehicle.fuel)}>{vehicle.fuel}%</span> Kraftstoff
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{vehicle.location}</span>
              </div>
              <div className="text-sm text-gray-400">
                {vehicle.mileage.toLocaleString()} km
              </div>
            </div>

            {vehicle.status === "verfügbar" && (
              <div className="mt-4 flex space-x-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Spawnen
                </Button>
                <Button size="sm" variant="outline">
                  Details
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GarageApp;
