
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Radio, Users, Plus, Edit, Trash2 } from "lucide-react";

interface LeitstelleAppProps {
  onBack: () => void;
}

const LeitstelleApp = ({ onBack }: LeitstelleAppProps) => {
  const [patrols, setPatrols] = useState([
    {
      id: 1,
      name: "Streife Alpha-12",
      members: ["J. Smith", "S. Johnson"],
      status: "10-8",
      statusText: "Im Dienst"
    },
    {
      id: 2,
      name: "Streife Bravo-15",
      members: ["M. Wilson"],
      status: "10-6",
      statusText: "Beschäftigt"
    },
    {
      id: 3,
      name: "Streife Charlie-22",
      members: ["E. Brown", "D. Lee"],
      status: "10-7",
      statusText: "Nicht im Dienst"
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPatrol, setEditingPatrol] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    members: [""],
    status: "10-8"
  });

  const onlineOfficers = 8;

  const statusCodes = [
    { code: "10-8", text: "Im Dienst" },
    { code: "10-6", text: "Beschäftigt" },
    { code: "10-7", text: "Nicht im Dienst" },
    { code: "10-23", text: "Am Standort" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "10-8": return "bg-green-600";
      case "10-6": return "bg-yellow-600";
      case "10-7": return "bg-red-600";
      case "10-23": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const handleCreatePatrol = () => {
    if (formData.name && formData.members[0]) {
      const newPatrol = {
        id: Date.now(),
        name: formData.name,
        members: formData.members.filter(m => m.trim() !== ""),
        status: formData.status,
        statusText: statusCodes.find(s => s.code === formData.status)?.text || ""
      };
      setPatrols([...patrols, newPatrol]);
      setFormData({ name: "", members: [""], status: "10-8" });
      setShowCreateForm(false);
    }
  };

  const handleDeletePatrol = (id: number) => {
    setPatrols(patrols.filter(p => p.id !== id));
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

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData({ ...formData, members: newMembers });
    }
  };

  if (showCreateForm || editingPatrol) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => {
            setShowCreateForm(false);
            setEditingPatrol(null);
            setFormData({ name: "", members: [""], status: "10-8" });
          }} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">
            {editingPatrol ? "Streife bearbeiten" : "Neue Streife erstellen"}
          </h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Streifenname:</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="z.B. Streife Alpha-12"
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mitglieder:</label>
              {formData.members.map((member, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder="Beamtername"
                    className="bg-gray-700 border-gray-600"
                  />
                  {formData.members.length > 1 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeMember(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button size="sm" variant="outline" onClick={addMemberField}>
                <Plus className="w-4 h-4 mr-2" />
                Mitglied hinzufügen
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status Code:</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              >
                {statusCodes.map(code => (
                  <option key={code.code} value={code.code}>
                    {code.code} - {code.text}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreatePatrol} className="bg-blue-600 hover:bg-blue-700">
                {editingPatrol ? "Speichern" : "Erstellen"}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowCreateForm(false);
                setEditingPatrol(null);
                setFormData({ name: "", members: [""], status: "10-8" });
              }}>
                Abbrechen
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Radio className="w-6 h-6 mr-2 text-blue-400" />
            Leitstelle - Streifen
          </h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neue Streife
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Online Beamte</p>
              <p className="text-2xl font-bold text-green-400">{onlineOfficers}</p>
            </div>
            <Users className="w-8 h-8 text-green-400" />
          </div>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Aktive Streifen</p>
              <p className="text-2xl font-bold text-blue-400">{patrols.length}</p>
            </div>
            <Radio className="w-8 h-8 text-blue-400" />
          </div>
        </Card>
      </div>

      {/* Patrols List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Aktuelle Streifen</h3>
        {patrols.map((patrol) => (
          <Card key={patrol.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg">{patrol.name}</h4>
              <Badge className={getStatusColor(patrol.status)}>
                {patrol.status} - {patrol.statusText}
              </Badge>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Mitglieder:</p>
              <div className="flex flex-wrap gap-2">
                {patrol.members.map((member, index) => (
                  <Badge key={index} variant="outline">
                    {member}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Bearbeiten
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-red-400 hover:text-red-300"
                onClick={() => handleDeletePatrol(patrol.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Löschen
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeitstelleApp;
