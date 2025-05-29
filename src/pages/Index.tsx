
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Car, 
  Radio, 
  FileText,
  Search,
  AlertTriangle,
  Shield,
  Camera,
  UserCheck,
  ClipboardList
} from "lucide-react";
import FraktionApp from "@/components/apps/FraktionApp";
import GarageApp from "@/components/apps/GarageApp";
import LeitstelleApp from "@/components/apps/LeitstelleApp";
import AktenApp from "@/components/apps/AktenApp";
import PersonenSucheApp from "@/components/apps/PersonenSucheApp";
import FahrzeugSucheApp from "@/components/apps/FahrzeugSucheApp";
import IncidentApp from "@/components/apps/IncidentApp";
import WarrantsApp from "@/components/apps/WarrantsApp";
import BeweismittelApp from "@/components/apps/BeweismittelApp";
import OfficerApp from "@/components/apps/OfficerApp";

const Index = () => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);

  const apps = [
    { id: 'fraktion', name: 'Fraktion', icon: Users, color: 'bg-blue-600', component: FraktionApp },
    { id: 'garage', name: 'Garage', icon: Car, color: 'bg-green-600', component: GarageApp },
    { id: 'leitstelle', name: 'Leitstelle', icon: Radio, color: 'bg-purple-600', component: LeitstelleApp },
    { id: 'akten', name: 'Akten', icon: FileText, color: 'bg-yellow-600', component: AktenApp },
    { id: 'personen', name: 'Personen', icon: Search, color: 'bg-red-600', component: PersonenSucheApp },
    { id: 'fahrzeuge', name: 'Fahrzeuge', icon: Car, color: 'bg-orange-600', component: FahrzeugSucheApp },
    { id: 'incidents', name: 'Einsätze', icon: AlertTriangle, color: 'bg-red-500', component: IncidentApp },
    { id: 'warrants', name: 'Haftbefehle', icon: Shield, color: 'bg-gray-600', component: WarrantsApp },
    { id: 'beweise', name: 'Beweise', icon: Camera, color: 'bg-indigo-600', component: BeweismittelApp },
    { id: 'officers', name: 'Officers', icon: UserCheck, color: 'bg-teal-600', component: OfficerApp }
  ];

  const ActiveApp = currentApp ? apps.find(app => app.id === currentApp)?.component : null;

  if (currentApp && ActiveApp) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-[800px] h-[600px] bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
          <ScrollArea className="w-full h-full">
            <ActiveApp onBack={() => setCurrentApp(null)} />
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[800px] h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-600 overflow-hidden">
        <ScrollArea className="w-full h-full">
          <div className="p-8 text-white">
            {/* App Grid */}
            <div className="grid grid-cols-5 gap-4">
              {apps.map((app) => (
                <Card
                  key={app.id}
                  className="bg-gray-800 border-gray-600 hover:bg-gray-700 transition-all duration-300 cursor-pointer group"
                  onClick={() => setCurrentApp(app.id)}
                >
                  <div className="p-4 text-center">
                    <div className={`${app.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <app.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-medium text-sm">{app.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
