
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Car, User, AlertTriangle, FileText } from "lucide-react";

interface FahrzeugSucheAppProps {
  onBack: () => void;
}

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  owner: string;
  insurance: boolean;
  stolen: boolean;
  impounded: boolean;
  warrants: number;
  notes: string;
}

const FahrzeugSucheApp = ({ onBack }: FahrzeugSucheAppProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const mockVehicles: Vehicle[] = [
    {
      id: "1",
      plate: "ABC123",
      model: "Karin Sultan",
      color: "Schwarz",
      owner: "Max Mustermann",
      insurance: true,
      stolen: false,
      impounded: false,
      warrants: 0,
      notes: "Keine besonderen Vorkommnisse"
    },
    {
      id: "2",
      plate: "XYZ789",
      model: "Pegassi Zentorno",
      color: "Rot",
      owner: "Sarah Johnson",
      insurance: false,
      stolen: true,
      impounded: true,
      warrants: 2,
      notes: "Fahrzeug wurde bei Verfolgungsjagd gestohlen"
    }
  ];

  const filteredVehicles = mockVehicles.filter(vehicle =>
    vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedVehicle) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedVehicle(null)} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Fahrzeugdetails</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fahrzeugdaten */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Fahrzeuginformationen</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Kennzeichen</label>
                <p className="text-white font-bold text-lg">{selectedVehicle.plate}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Modell</label>
                <p className="text-white">{selectedVehicle.model}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Farbe</label>
                <p className="text-white">{selectedVehicle.color}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Besitzer</label>
                <p className="text-white">{selectedVehicle.owner}</p>
              </div>
            </div>
          </Card>

          {/* Status und Aktionen */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Status</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Versicherung:</span>
                <Badge className={selectedVehicle.insurance ? "bg-green-600" : "bg-red-600"}>
                  {selectedVehicle.insurance ? "Gültig" : "Ungültig"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Gestohlen:</span>
                <Badge className={selectedVehicle.stolen ? "bg-red-600" : "bg-green-600"}>
                  {selectedVehicle.stolen ? "Ja" : "Nein"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Beschlagnahmt:</span>
                <Badge className={selectedVehicle.impounded ? "bg-yellow-600" : "bg-green-600"}>
                  {selectedVehicle.impounded ? "Ja" : "Nein"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Haftbefehle:</span>
                <Badge className={selectedVehicle.warrants > 0 ? "bg-red-600" : "bg-green-600"}>
                  {selectedVehicle.warrants}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <User className="w-4 h-4 mr-2" />
                Besitzer anzeigen
              </Button>
              <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Fahrzeugakte erstellen
              </Button>
              {selectedVehicle.stolen && (
                <Button variant="outline" className="w-full text-red-400 border-red-600 hover:bg-red-900">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Als gestohlen melden
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Notizen */}
        <Card className="bg-gray-800 border-gray-700 p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Notizen</h3>
          <p className="text-gray-300">{selectedVehicle.notes}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mr-4 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Car className="w-6 h-6 mr-2 text-orange-400" />
          Fahrzeug Suche
        </h1>
      </div>

      {/* Suchfeld */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Kennzeichen, Modell oder Besitzer suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Suchergebnisse */}
      <div className="space-y-4">
        {filteredVehicles.map((vehicle) => (
          <Card 
            key={vehicle.id} 
            className="bg-gray-800 border-gray-700 p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Car className="w-8 h-8 text-orange-400" />
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {vehicle.plate} - {vehicle.model}
                  </h3>
                  <p className="text-gray-300">{vehicle.color} | Besitzer: {vehicle.owner}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {vehicle.stolen && (
                  <Badge className="bg-red-600 text-white">Gestohlen</Badge>
                )}
                {vehicle.impounded && (
                  <Badge className="bg-yellow-600 text-white">Beschlagnahmt</Badge>
                )}
                {!vehicle.insurance && (
                  <Badge className="bg-red-600 text-white">Keine Versicherung</Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FahrzeugSucheApp;
