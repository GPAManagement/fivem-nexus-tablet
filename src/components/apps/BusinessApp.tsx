
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Briefcase, Plus, Users, DollarSign } from "lucide-react";

interface BusinessAppProps {
  onBack: () => void;
}

const BusinessApp = ({ onBack }: BusinessAppProps) => {
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: "Los Santos Imports",
      type: "Autohändler",
      members: ["John Doe", "Jane Smith"],
      balance: 125000,
      status: "aktiv"
    },
    {
      id: 2,
      name: "Downtown Garage",
      type: "Werkstatt",
      members: ["Mike Wilson"],
      balance: 85000,
      status: "aktiv"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    members: [""]
  });

  const handleCreateBusiness = () => {
    if (formData.name && formData.type) {
      const newBusiness = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        members: formData.members.filter(m => m.trim() !== ""),
        balance: 0,
        status: "aktiv"
      };
      setBusinesses([...businesses, newBusiness]);
      setFormData({ name: "", type: "", members: [""] });
      setShowCreateForm(false);
    }
  };

  const addMemberField = () => {
    setFormData({
      ...formData,
      members: [...formData.members, ""]
    });
  };

  const updateMember = (index: number, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData({ ...formData, members: newMembers });
  };

  if (showCreateForm) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setShowCreateForm(false)} className="mr-4 text-white hover:bg-gray-700">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Neues Business erstellen</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Business Name:</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="z.B. Downtown Garage"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Business Typ:</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="">Bitte wählen...</option>
                <option value="Autohändler">Autohändler</option>
                <option value="Werkstatt">Werkstatt</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Tankstelle">Tankstelle</option>
                <option value="Sonstiges">Sonstiges</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Mitglieder:</label>
              {formData.members.map((member, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder="Spielername"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addMemberField} className="text-white border-gray-600 hover:bg-gray-700">
                <Plus className="w-4 h-4 mr-2" />
                Mitglied hinzufügen
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateBusiness} className="bg-blue-600 hover:bg-blue-700">
                Erstellen
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="text-white border-gray-600 hover:bg-gray-700">
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4 text-white hover:bg-gray-700">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-emerald-400" />
            Business Management
          </h1>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neues Business
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Meine Businesses</p>
              <p className="text-2xl font-bold text-emerald-400">{businesses.length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-emerald-400" />
          </div>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Gesamtkapital</p>
              <p className="text-2xl font-bold text-green-400">
                ${businesses.reduce((sum, b) => sum + b.balance, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </Card>
      </div>

      {/* Business List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Meine Businesses</h3>
        {businesses.map((business) => (
          <Card key={business.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-lg text-white">{business.name}</h4>
                <p className="text-gray-400">{business.type}</p>
              </div>
              <Badge className="bg-green-600">
                {business.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-400">Kontostand</p>
                <p className="font-semibold text-green-400">${business.balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Mitglieder</p>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{business.members.length}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Mitglieder:</p>
              <div className="flex flex-wrap gap-2">
                {business.members.map((member, index) => (
                  <Badge key={index} variant="outline" className="text-white border-gray-600">
                    {member}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Verwalten
              </Button>
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Finanzen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusinessApp;
