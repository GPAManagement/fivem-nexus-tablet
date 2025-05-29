
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Plus, User, Calendar, Search } from "lucide-react";

interface WarrantsAppProps {
  onBack: () => void;
}

interface Warrant {
  id: string;
  suspect: string;
  charges: string[];
  issuedBy: string;
  issuedDate: string;
  status: "Active" | "Served" | "Expired";
  priority: "Low" | "Medium" | "High";
  description: string;
}

const WarrantsApp = ({ onBack }: WarrantsAppProps) => {
  const [warrants, setWarrants] = useState<Warrant[]>([
    {
      id: "1",
      suspect: "John Doe",
      charges: ["Diebstahl", "Widerstand gegen Vollstreckung"],
      issuedBy: "Judge Anderson",
      issuedDate: "2024-01-15",
      status: "Active",
      priority: "High",
      description: "Verdächtiger flüchtig nach Ladendiebstahl"
    },
    {
      id: "2",
      suspect: "Sarah Wilson",
      charges: ["Geschwindigkeitsüberschreitung"],
      issuedBy: "Judge Miller",
      issuedDate: "2024-01-18",
      status: "Active",
      priority: "Low",
      description: "Wiederholte Geschwindigkeitsüberschreitungen"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    suspect: "",
    charges: [""],
    priority: "Medium" as const,
    description: ""
  });

  const filteredWarrants = warrants.filter(warrant =>
    warrant.suspect.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-red-600";
      case "Served": return "bg-green-600";
      case "Expired": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const handleCreateWarrant = () => {
    if (formData.suspect && formData.charges[0]) {
      const newWarrant: Warrant = {
        id: Date.now().toString(),
        suspect: formData.suspect,
        charges: formData.charges.filter(c => c.trim() !== ""),
        issuedBy: "Current Officer",
        issuedDate: new Date().toISOString().split('T')[0],
        status: "Active",
        priority: formData.priority,
        description: formData.description
      };
      setWarrants([newWarrant, ...warrants]);
      setFormData({ suspect: "", charges: [""], priority: "Medium", description: "" });
      setShowCreateForm(false);
    }
  };

  const addChargeField = () => {
    setFormData({
      ...formData,
      charges: [...formData.charges, ""]
    });
  };

  const updateCharge = (index: number, value: string) => {
    const newCharges = [...formData.charges];
    newCharges[index] = value;
    setFormData({ ...formData, charges: newCharges });
  };

  const removeCharge = (index: number) => {
    if (formData.charges.length > 1) {
      const newCharges = formData.charges.filter((_, i) => i !== index);
      setFormData({ ...formData, charges: newCharges });
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
          <h1 className="text-2xl font-bold">Neuer Haftbefehl</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Verdächtiger:</label>
              <Input
                value={formData.suspect}
                onChange={(e) => setFormData({...formData, suspect: e.target.value})}
                placeholder="Name des Verdächtigen"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Anklagepunkte:</label>
              {formData.charges.map((charge, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={charge}
                    onChange={(e) => updateCharge(index, e.target.value)}
                    placeholder="Anklagepunkt"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  {formData.charges.length > 1 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeCharge(index)}
                      className="text-white hover:bg-gray-700"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addChargeField} className="text-white border-gray-600 hover:bg-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Anklagepunkt hinzufügen
              </Button>
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
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Beschreibung:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Zusätzliche Informationen"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24 resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateWarrant} className="bg-blue-600 hover:bg-blue-700">
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
            <Shield className="w-6 h-6 mr-2 text-gray-400" />
            Haftbefehle
          </h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neuer Haftbefehl
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nach Verdächtigen suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {warrants.filter(w => w.status === "Active").length}
            </p>
            <p className="text-sm text-gray-300">Aktiv</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {warrants.filter(w => w.status === "Served").length}
            </p>
            <p className="text-sm text-gray-300">Vollstreckt</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400">
              {warrants.filter(w => w.status === "Expired").length}
            </p>
            <p className="text-sm text-gray-300">Abgelaufen</p>
          </div>
        </Card>
      </div>

      {/* Warrants List */}
      <div className="space-y-4">
        {filteredWarrants.map((warrant) => (
          <Card key={warrant.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <User className="w-6 h-6 text-gray-400" />
                <div>
                  <h3 className="font-bold text-lg text-white">{warrant.suspect}</h3>
                  <p className="text-gray-300">Ausgestellt von: {warrant.issuedBy}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge className={getPriorityColor(warrant.priority)}>
                  {warrant.priority}
                </Badge>
                <Badge className={getStatusColor(warrant.status)}>
                  {warrant.status}
                </Badge>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Anklagepunkte:</p>
              <div className="flex flex-wrap gap-2">
                {warrant.charges.map((charge, index) => (
                  <Badge key={index} variant="outline" className="text-white border-gray-600">
                    {charge}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Ausgestellt: {warrant.issuedDate}</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{warrant.description}</p>
            
            <div className="flex space-x-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Vollstrecken
              </Button>
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WarrantsApp;
