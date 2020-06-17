# corona-medical-service

Service Engineering UE5

Der Code für die UE4 befindet sich in dem Branch ue4!
Der Masterbranch wurde für die UE5 fortgesetzt.

#### Änderungen zu UE4

- Backend wurde komplett gelöscht, stattdessen wird die API der Firestore datenbank verwendet
- Projekt wurde umstrukturiert um ein reines Angular Frontend projekt darzustellen
- Firebase cloud functions wurden im ordner functions/ hinzugefügt

#### Vorraussetzungen:

- Node.js installiert: [node.js](https://nodejs.org/en/)
- Angular installiert mit `npm install -g @angular/cli`

#### Installation für eine Lokale ausführung

Commandline im project root öffnen

- `npm install`
- `npm run start`

Der Angular Webserver startet auf [localhost:4200](http://localhost:4200)

#### Hosted Version

Eine gehostete Version der Web App befindet sich [corona-medical-service.web.app](https://corona-medical-service.web.app/)
