
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, User, Phone, MapPin, Calendar, AlertTriangle, FileText } from "lucide-react";

interface PersonenSucheAppProps {
  onBack: () => void;
}

interface Person {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  licenses: string[];
  warrants: number;
  citations: number;
  arrests: number;
  photo?: string;
  notes: string;
}

const PersonenSucheApp = ({ onBack }: PersonenSucheAppProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const mockPersons: Person[] = [
    {
      id: "1",
      firstName: "Max",
      lastName: "Mustermann",
      dateOfBirth: "1985-03-15",
      phoneNumber: "555-0123",
      address: "Vinewood Hills, 123",
      licenses: ["Führerschein", "Waffenschein"],
      warrants: 0,
      citations: 2,
      arrests: 1,
      notes: "Mehrfache Geschwindigkeitsüberschreitungen"
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      dateOfBirth: "1992-07-22",
      phoneNumber: "555-0456",
      address: "Downtown, 456",
      licenses: ["Führerschein"],
      warrants: 1,
      citations: 5,
      arrests: 2,
      notes: "Wiederholungstäter bei Verkehrsdelikten"
    }
  ];

  const filteredPersons = mockPersons.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedPerson) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPerson(null)} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Personenprofil</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Foto und Grunddaten */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="text-center mb-4">
              <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-white">
                {selectedPerson.firstName} {selectedPerson.lastName}
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">Geboren: {selectedPerson.dateOfBirth}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{selectedPerson.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-300">{selectedPerson.address}</span>
              </div>
            </div>
          </Card>

          {/* Lizenzen und Status */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Lizenzen</h3>
            <div className="space-y-2 mb-6">
              {selectedPerson.licenses.map((license, index) => (
                <Badge key={index} className="bg-green-600 text-white">
                  {license}
                </Badge>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-4 text-white">Polizeiliche Statistiken</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Haftbefehle:</span>
                <Badge className={selectedPerson.warrants > 0 ? "bg-red-600" : "bg-green-600"}>
                  {selectedPerson.warrants}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Verwarnungen:</span>
                <span className="text-white">{selectedPerson.citations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Verhaftungen:</span>
                <span className="text-white">{selectedPerson.arrests}</span>
              </div>
            </div>
          </Card>

          {/* Notizen */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Notizen</h3>
            <p className="text-gray-300 text-sm">{selectedPerson.notes}</p>
            
            <div className="mt-6 space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Neue Akte hinzufügen
              </Button>
              <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Haftbefehl erstellen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mr-4 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Search className="w-6 h-6 mr-2 text-red-400" />
          Personen Suche
        </h1>
      </div>

      {/* Suchfeld */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nach Name suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Suchergebnisse */}
      <div className="space-y-4">
        {filteredPersons.map((person) => (
          <Card 
            key={person.id} 
            className="bg-gray-800 border-gray-700 p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setSelectedPerson(person)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {person.firstName} {person.lastName}
                  </h3>
                  <p className="text-gray-300">{person.address}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                {person.warrants > 0 && (
                  <Badge className="bg-red-600 text-white">
                    {person.warrants} Haftbefehl(e)
                  </Badge>
                )}
                <Badge className="bg-gray-600 text-white">
                  {person.citations} Verwarnungen
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonenSucheApp;
