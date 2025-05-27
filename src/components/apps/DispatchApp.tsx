
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Phone, Radio, AlertTriangle, Clock, Send } from "lucide-react";

interface DispatchAppProps {
  onBack: () => void;
}

const DispatchApp = ({ onBack }: DispatchAppProps) => {
  const [activeTab, setActiveTab] = useState("calls");
  const [newMessage, setNewMessage] = useState("");

  const emergencyCalls = [
    {
      id: "911-001",
      caller: "Maria Schmidt",
      phone: "555-0123",
      type: "Einbruch",
      priority: "hoch",
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
      priority: "mittel",
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
      priority: "hoch",
      location: "Strawberry Ave",
      time: "13:28",
      status: "bearbeitet",
      description: "Mehrere Schüsse in der Nähe des Parks gehört"
    }
  ];

  const radioMessages = [
    { id: 1, unit: "Adam-12", message: "10-4, unterwegs zum Einsatzort", time: "13:47", type: "response" },
    { id: 2, unit: "Dispatch", message: "Adam-15, Code 2 zu Grove Street 2847", time: "13:46", type: "dispatch" },
    { id: 3, unit: "Adam-15", message: "Adam-15 verfügbar für Einsätze", time: "13:45", type: "status" },
    { id: 4, unit: "Henry-1", message: "Verdächtiger festgenommen, Unterstützung nicht mehr erforderlich", time: "13:43", type: "update" }
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
      case "wartend": return "bg-red-600";
      case "zugewiesen": return "bg-blue-600";
      case "bearbeitet": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "dispatch": return "text-blue-400";
      case "response": return "text-green-400";
      case "update": return "text-purple-400";
      case "status": return "text-yellow-400";
      default: return "text-gray-400";
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
          <Phone className="w-6 h-6 mr-2 text-red-400" />
          Dispatch System
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        {["calls", "radio", "units"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "calls" ? "Notrufe" : tab === "radio" ? "Funk" : "Einheiten"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "calls" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Eingehende Notrufe</h3>
            <div className="flex space-x-2">
              <Badge className="bg-red-600">3 Wartend</Badge>
              <Badge className="bg-blue-600">1 Zugewiesen</Badge>
            </div>
          </div>

          {emergencyCalls.map((call) => (
            <Card key={call.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <div>
                    <h4 className="font-bold text-lg">{call.type}</h4>
                    <p className="text-gray-400">{call.caller} • {call.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(call.priority)}>
                    {call.priority.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(call.status)}>
                    {call.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Standort</p>
                  <p className="font-semibold">{call.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Eingang</p>
                  <p className="font-mono">{call.time}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Beschreibung</p>
                <p className="text-sm bg-gray-700 p-3 rounded">{call.description}</p>
              </div>

              <div className="flex space-x-2">
                {call.status === "wartend" && (
                  <>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Einheit zuweisen
                    </Button>
                    <Button size="sm" variant="outline">
                      Details
                    </Button>
                  </>
                )}
                {call.status === "zugewiesen" && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Status aktualisieren
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "radio" && (
        <div className="space-y-6">
          {/* Radio Messages */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Radio className="w-5 h-5 mr-2" />
              Funkverkehr
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
              {radioMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-semibold ${getMessageTypeColor(msg.type)}`}>
                        {msg.unit}
                      </span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Funknachricht eingeben..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-gray-700 border-gray-600"
              />
              <Button size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Quick Commands */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h4 className="font-semibold mb-4">Schnellbefehle</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline">10-4 (Verstanden)</Button>
              <Button size="sm" variant="outline">10-6 (Beschäftigt)</Button>
              <Button size="sm" variant="outline">10-8 (Im Dienst)</Button>
              <Button size="sm" variant="outline">10-7 (Nicht im Dienst)</Button>
              <Button size="sm" variant="outline">Code 2 (Eile ohne Signal)</Button>
              <Button size="sm" variant="outline">Code 3 (Eile mit Signal)</Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "units" && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Einheiten Status</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="font-semibold mb-3">Verfügbare Einheiten</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-900/30 rounded">
                  <span>Adam-12</span>
                  <Badge className="bg-green-600">Verfügbar</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-900/30 rounded">
                  <span>Adam-22</span>
                  <Badge className="bg-green-600">Verfügbar</Badge>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700 p-4">
              <h4 className="font-semibold mb-3">Im Einsatz</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-900/30 rounded">
                  <span>Adam-15</span>
                  <Badge className="bg-blue-600">Einsatz</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-900/30 rounded">
                  <span>Henry-1</span>
                  <Badge className="bg-yellow-600">Pause</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispatchApp;
