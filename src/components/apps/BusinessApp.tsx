
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Briefcase, Plus, Users, DollarSign, TrendingUp, Settings } from "lucide-react";

interface BusinessAppProps {
  onBack: () => void;
}

const BusinessApp = ({ onBack }: BusinessAppProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBusiness, setNewBusiness] = useState({
    name: "",
    description: "",
    type: "restaurant"
  });

  const myBusinesses = [
    {
      id: 1,
      name: "Downtown Burger",
      type: "Restaurant",
      revenue: 25400,
      employees: 8,
      status: "aktiv",
      description: "Beliebtes Burger-Restaurant in der Innenstadt"
    },
    {
      id: 2,
      name: "LS Car Wash",
      type: "Autowäsche",
      revenue: 12800,
      employees: 3,
      status: "aktiv",
      description: "Professionelle Autowaschanlage"
    }
  ];

  const businessTypes = [
    { value: "restaurant", label: "Restaurant" },
    { value: "shop", label: "Geschäft" },
    { value: "garage", label: "Werkstatt" },
    { value: "carwash", label: "Autowäsche" },
    { value: "club", label: "Club/Bar" },
    { value: "other", label: "Sonstiges" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktiv": return "bg-green-600";
      case "pause": return "bg-yellow-600";
      case "geschlossen": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const handleCreateBusiness = () => {
    if (newBusiness.name && newBusiness.description) {
      console.log("Business erstellt:", newBusiness);
      setNewBusiness({ name: "", description: "", type: "restaurant" });
      setShowCreateForm(false);
    }
  };

  if (showCreateForm) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setShowCreateForm(false)} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Neues Business erstellen</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Business Name:</label>
              <Input
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({...newBusiness, name: e.target.value})}
                placeholder="z.B. Mein Restaurant"
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Typ:</label>
              <select 
                value={newBusiness.type}
                onChange={(e) => setNewBusiness({...newBusiness, type: e.target.value})}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
              >
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Beschreibung:</label>
              <Textarea
                value={newBusiness.description}
                onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})}
                placeholder="Beschreibe dein Business..."
                className="bg-gray-700 border-gray-600"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateBusiness} className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Business erstellen
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
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
            <Briefcase className="w-6 h-6 mr-2 text-emerald-400" />
            Business Manager
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

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        {["overview", "finances", "employees"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "overview" ? "Übersicht" : 
             tab === "finances" ? "Finanzen" : "Mitarbeiter"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Meine Businesses</p>
                  <p className="text-2xl font-bold text-emerald-400">{myBusinesses.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-emerald-400" />
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Gesamt Umsatz</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${myBusinesses.reduce((sum, b) => sum + b.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Mitarbeiter</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {myBusinesses.reduce((sum, b) => sum + b.employees, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </Card>
          </div>

          {/* Business List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Meine Businesses</h3>
            {myBusinesses.map((business) => (
              <Card key={business.id} className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{business.name}</h4>
                    <p className="text-gray-400">{business.description}</p>
                  </div>
                  <Badge className={getStatusColor(business.status)}>
                    {business.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Typ</p>
                    <p className="font-semibold">{business.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Umsatz</p>
                    <p className="font-semibold text-green-400">${business.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Mitarbeiter</p>
                    <p className="font-semibold">{business.employees}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Verwalten
                  </Button>
                  <Button size="sm" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Statistiken
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === "finances" && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Finanzübersicht</h3>
          <div className="text-center text-gray-400">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p>Finanzdetails werden hier angezeigt</p>
          </div>
        </Card>
      )}

      {activeTab === "employees" && (
        <Card className="bg-gray-800 border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4">Mitarbeiterverwaltung</h3>
          <div className="text-center text-gray-400">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p>Mitarbeiterdetails werden hier angezeigt</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BusinessApp;
