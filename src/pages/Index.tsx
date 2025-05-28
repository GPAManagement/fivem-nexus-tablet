
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Car, 
  Mail, 
  Radio, 
  Phone, 
  FileText, 
  Briefcase,
  Settings
} from "lucide-react";
import FraktionApp from "@/components/apps/FraktionApp";
import GarageApp from "@/components/apps/GarageApp";
import MailApp from "@/components/apps/MailApp";
import LeitstelleApp from "@/components/apps/LeitstelleApp";
import DispatchApp from "@/components/apps/DispatchApp";
import AktenApp from "@/components/apps/AktenApp";
import BusinessApp from "@/components/apps/BusinessApp";

const Index = () => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);

  const apps = [
    { id: 'fraktion', name: 'Fraktion', icon: Users, color: 'bg-blue-600', component: FraktionApp },
    { id: 'garage', name: 'Garage', icon: Car, color: 'bg-green-600', component: GarageApp },
    { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-red-600', component: MailApp },
    { id: 'leitstelle', name: 'Leitstelle', icon: Radio, color: 'bg-purple-600', component: LeitstelleApp },
    { id: 'dispatch', name: 'Dispatch', icon: Phone, color: 'bg-orange-600', component: DispatchApp },
    { id: 'akten', name: 'Akten', icon: FileText, color: 'bg-yellow-600', component: AktenApp },
    { id: 'business', name: 'Business', icon: Briefcase, color: 'bg-emerald-600', component: BusinessApp },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-600', component: null },
  ];

  const ActiveApp = currentApp ? apps.find(app => app.id === currentApp)?.component : null;

  if (currentApp && ActiveApp) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-[800px] h-[600px] bg-black rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden">
          <ScrollArea className="w-full h-full">
            <ActiveApp onBack={() => setCurrentApp(null)} />
          </ScrollArea>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-[800px] h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-3xl shadow-2xl border-8 border-gray-800 overflow-hidden">
        <ScrollArea className="w-full h-full">
          <div className="p-8 text-white">
            {/* App Grid */}
            <div className="grid grid-cols-4 gap-6">
              {apps.map((app) => (
                <Card
                  key={app.id}
                  className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setCurrentApp(app.id)}
                >
                  <div className="p-6 text-center">
                    <div className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <app.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-white font-medium">{app.name}</h3>
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
