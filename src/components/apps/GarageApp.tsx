
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Car, Fuel, Settings, MapPin } from "lucide-react";

interface GarageAppProps {
  onBack: () => void;
}

const GarageApp = ({ onBack }: GarageAppProps) => {
  const vehicles = [
    {
      id: 1,
      name: "Police Cruiser #47",
      model: "Police Buffalo",
      status: "verfügbar",
      fuel: 85,
      location: "Mission Row PD",
      mileage: 15420
    },
    {
      id: 2,
      name: "Motorcycle Unit #12",
      model: "Police Bike",
      status: "im einsatz",
      fuel: 92,
      location: "Pillbox Hill",
      mileage: 8750
    },
    {
      id: 3,
      name: "SWAT Van #03",
      model: "Riot Van",
      status: "wartung",
      fuel: 45,
      location: "Sandy Shores",
      mileage: 45210
    },
    {
      id: 4,
      name: "Interceptor #21",
      model: "Police Interceptor",
      status: "verfügbar",
      fuel: 78,
      location: "Paleto Bay PD",
      mileage: 23100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verfügbar": return "bg-green-600";
      case "im einsatz": return "bg-blue-600";
      case "wartung": return "bg-red-600";
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
          <h1 className="text-2xl font-bold">Garage</h1>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Verwalten
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">3</p>
            <p className="text-sm text-gray-400">Verfügbar</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">1</p>
            <p className="text-sm text-gray-400">Im Einsatz</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">1</p>
            <p className="text-sm text-gray-400">Wartung</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">5</p>
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
                  Anfordern
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
