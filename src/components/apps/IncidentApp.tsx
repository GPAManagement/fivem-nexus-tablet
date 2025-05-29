
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, Plus, MapPin, Clock, User } from "lucide-react";

interface IncidentAppProps {
  onBack: () => void;
}

interface Incident {
  id: string;
  title: string;
  location: string;
  time: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Closed";
  assignedOfficer: string;
  description: string;
  type: string;
}

const IncidentApp = ({ onBack }: IncidentAppProps) => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "1",
      title: "Einbruch in Vinewood Hills",
      location: "Vinewood Hills, 123 Main St",
      time: "2024-01-20 14:30",
      priority: "High",
      status: "In Progress",
      assignedOfficer: "Officer Smith",
      description: "Verdächtiger Einbruch gemeldet. Fenster wurde aufgebrochen.",
      type: "Einbruch"
    },
    {
      id: "2",
      title: "Verkehrsunfall auf Highway",
      location: "Highway 1, Mile 45",
      time: "2024-01-20 15:15",
      priority: "Medium",
      status: "Open",
      assignedOfficer: "Officer Johnson",
      description: "Zwei Fahrzeuge kollidiert, keine Verletzten.",
      type: "Verkehrsunfall"
    },
    {
      id: "3",
      title: "Lärmbelästigung Downtown",
      location: "Downtown, Club District",
      time: "2024-01-20 16:00",
      priority: "Low",
      status: "Closed",
      assignedOfficer: "Officer Wilson",
      description: "Laute Musik aus Nachtclub, bereits behoben.",
      type: "Ruhestörung"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    priority: "Medium" as const,
    type: "",
    description: ""
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-700";
      case "High": return "bg-red-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-600";
      case "In Progress": return "bg-yellow-600";
      case "Closed": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const handleCreateIncident = () => {
    if (formData.title && formData.location) {
      const newIncident: Incident = {
        id: Date.now().toString(),
        ...formData,
        time: new Date().toLocaleString(),
        status: "Open",
        assignedOfficer: "Unassigned"
      };
      setIncidents([newIncident, ...incidents]);
      setFormData({ title: "", location: "", priority: "Medium", type: "", description: "" });
      setShowCreateForm(false);
    }
  };

  if (showCreateForm) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowCreateForm(false)} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Neuer Einsatz</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Titel:</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Einsatztitel"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Ort:</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Einsatzort"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Art:</label>
              <Input
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                placeholder="z.B. Einbruch, Verkehrsunfall"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Priorität:</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="Low">Niedrig</option>
                <option value="Medium">Mittel</option>
                <option value="High">Hoch</option>
                <option value="Critical">Kritisch</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Beschreibung:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Einsatzbeschreibung"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24 resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateIncident} className="bg-blue-600 hover:bg-blue-700">
                Erstellen
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                Abbrechen
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2 text-red-400" />
            Einsätze
          </h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neuer Einsatz
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {incidents.filter(i => i.status === "Open").length}
            </p>
            <p className="text-sm text-gray-300">Offen</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {incidents.filter(i => i.status === "In Progress").length}
            </p>
            <p className="text-sm text-gray-300">In Bearbeitung</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {incidents.filter(i => i.status === "Closed").length}
            </p>
            <p className="text-sm text-gray-300">Geschlossen</p>
          </div>
        </Card>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-white">{incident.title}</h3>
                <p className="text-gray-300">{incident.type}</p>
              </div>
              <div className="flex space-x-2">
                <Badge className={getPriorityColor(incident.priority)}>
                  {incident.priority}
                </Badge>
                <Badge className={getStatusColor(incident.status)}>
                  {incident.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{incident.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{incident.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{incident.assignedOfficer}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{incident.description}</p>
            
            <div className="flex space-x-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Details
              </Button>
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Zuweisen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IncidentApp;
