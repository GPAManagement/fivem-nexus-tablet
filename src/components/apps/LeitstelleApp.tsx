
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Radio, AlertTriangle, MapPin, Clock, Users } from "lucide-react";

interface LeitstelleAppProps {
  onBack: () => void;
}

const LeitstelleApp = ({ onBack }: LeitstelleAppProps) => {
  const [activeView, setActiveView] = useState("overview");

  const activeOperations = [
    {
      id: "OP-2024-001",
      title: "Bankraub Fleeca Bank",
      priority: "hoch",
      location: "Vinewood Boulevard",
      units: 8,
      status: "aktiv",
      time: "12:45"
    },
    {
      id: "OP-2024-002", 
      title: "Verfolgungsjagd I-5",
      priority: "mittel",
      location: "Interstate 5",
      units: 4,
      status: "aktiv",
      time: "13:20"
    },
    {
      id: "OP-2024-003",
      title: "Häusliche Gewalt",
      priority: "niedrig",
      location: "Grove Street",
      units: 2,
      status: "abgeschlossen",
      time: "11:30"
    }
  ];

  const unitStatus = [
    { id: "Unit-01", callsign: "Adam-12", status: "verfügbar", location: "Mission Row" },
    { id: "Unit-02", callsign: "Adam-15", status: "im einsatz", location: "Downtown" },
    { id: "Unit-03", callsign: "Adam-22", status: "verfügbar", location: "Paleto Bay" },
    { id: "Unit-04", callsign: "Henry-1", status: "pause", location: "Sandy Shores" },
    { id: "Unit-05", callsign: "Lincoln-7", status: "im einsatz", location: "Vespucci" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "hoch": return "bg-red-600";
      case "mittel": return "bg-yellow-600";
      case "niedrig": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verfügbar": return "bg-green-600";
      case "im einsatz": return "bg-blue-600";
      case "pause": return "bg-yellow-600";
      case "aktiv": return "bg-red-600";
      case "abgeschlossen": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Radio className="w-6 h-6 mr-2 text-blue-400" />
          Leitstelle
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        {["overview", "operations", "units", "map"].map((view) => (
          <Button
            key={view}
            variant={activeView === view ? "default" : "ghost"}
            onClick={() => setActiveView(view)}
            className="capitalize"
          >
            {view === "overview" ? "Übersicht" : 
             view === "operations" ? "Einsätze" :
             view === "units" ? "Einheiten" : "Karte"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeView === "overview" && (
        <div className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Aktive Einsätze</p>
                  <p className="text-2xl font-bold text-red-400">2</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Verfügbare Einheiten</p>
                  <p className="text-2xl font-bold text-green-400">3</p>
                </div>
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Im Einsatz</p>
                  <p className="text-2xl font-bold text-blue-400">2</p>
                </div>
                <Radio className="w-8 h-8 text-blue-400" />
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Durchschnittl. Antwortzeit</p>
                  <p className="text-2xl font-bold text-purple-400">4:32</p>
                </div>
                <Clock className="w-8 h-8 text-purple-400" />
              </div>
            </Card>
          </div>

          {/* Active Operations */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Aktuelle Einsätze</h3>
            <div className="space-y-3">
              {activeOperations.filter(op => op.status === "aktiv").map((operation) => (
                <div key={operation.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <div className="flex items-center space-x-4">
                    <Badge className={getPriorityColor(operation.priority)}>
                      {operation.priority.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="font-semibold">{operation.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <MapPin className="w-3 h-3" />
                        <span>{operation.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{operation.units} Einheiten</p>
                    <p className="text-sm font-mono">{operation.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeView === "operations" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Alle Einsätze</h3>
            <Button className="bg-red-600 hover:bg-red-700">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Neuer Einsatz
            </Button>
          </div>
          
          {activeOperations.map((operation) => (
            <Card key={operation.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <Badge className={getPriorityColor(operation.priority)}>
                    {operation.priority.toUpperCase()}
                  </Badge>
                  <h4 className="font-bold text-lg">{operation.title}</h4>
                </div>
                <Badge className={getStatusColor(operation.status)}>
                  {operation.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Einsatz-ID</p>
                  <p className="font-mono">{operation.id}</p>
                </div>
                <div>
                  <p className="text-gray-400">Standort</p>
                  <p>{operation.location}</p>
                </div>
                <div>
                  <p className="text-gray-400">Einheiten</p>
                  <p>{operation.units} zugewiesen</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline">Details</Button>
                <Button size="sm" variant="outline">Einheiten zuweisen</Button>
                {operation.status === "aktiv" && (
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    Abschließen
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeView === "units" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Einheitenstatus</h3>
          {unitStatus.map((unit) => (
            <Card key={unit.id} className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(unit.status)}`}></div>
                  <div>
                    <p className="font-semibold">{unit.callsign}</p>
                    <p className="text-sm text-gray-400">{unit.location}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(unit.status)}>
                  {unit.status.toUpperCase()}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeView === "map" && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Einsatzkarte</h3>
          <div className="h-96 bg-gray-700 rounded flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Karte wird geladen...</p>
              <p className="text-sm text-gray-500 mt-2">Zeigt alle aktiven Einheiten und Einsätze</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LeitstelleApp;
