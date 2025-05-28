
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, AlertTriangle, Clock } from "lucide-react";

interface DispatchAppProps {
  onBack: () => void;
}

const DispatchApp = ({ onBack }: DispatchAppProps) => {
  const emergencyCalls = [
    {
      id: "911-001",
      caller: "Maria Schmidt",
      phone: "555-0123",
      type: "Einbruch",
      location: "2847 Grove Street",
      time: "13:45",
      status: "wartend",
      description: "Verdächtiger Einbrecher im Hinterhof gesehen"
    },
    {
      id: "911-002",
      caller: "James Wilson",
      phone: "555-0456",
      type: "Verkehrsunfall",
      location: "Intersection Vinewood & Highland",
      time: "13:32",
      status: "zugewiesen",
      description: "Auffahrunfall, keine Verletzten"
    },
    {
      id: "911-003",
      caller: "Anonymous",
      phone: "Unbekannt",
      type: "Schüsse abgefeuert",
      location: "Strawberry Ave",
      time: "13:28",
      status: "bearbeitet",
      description: "Mehrere Schüsse in der Nähe des Parks gehört"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "wartend": return "bg-red-600";
      case "zugewiesen": return "bg-blue-600";
      case "bearbeitet": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4 text-white hover:bg-gray-700">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Phone className="w-6 h-6 mr-2 text-red-400" />
          Notrufe
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {emergencyCalls.filter(call => call.status === "wartend").length}
            </p>
            <p className="text-sm text-gray-400">Wartend</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {emergencyCalls.filter(call => call.status === "zugewiesen").length}
            </p>
            <p className="text-sm text-gray-400">Zugewiesen</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {emergencyCalls.filter(call => call.status === "bearbeitet").length}
            </p>
            <p className="text-sm text-gray-400">Bearbeitet</p>
          </div>
        </Card>
      </div>

      {/* Emergency Calls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Alle Notrufe</h3>
        {emergencyCalls.map((call) => (
          <Card key={call.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div>
                  <h4 className="font-bold text-lg text-white">{call.type}</h4>
                  <p className="text-gray-400">{call.caller} • {call.phone}</p>
                </div>
              </div>
              <Badge className={getStatusColor(call.status)}>
                {call.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Standort</p>
                <p className="font-semibold text-white">{call.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Eingang</p>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="font-mono text-white">{call.time}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Beschreibung</p>
              <p className="text-sm bg-gray-700 p-3 rounded text-white">{call.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DispatchApp;
