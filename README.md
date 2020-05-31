# corona-medical-service
Service Engineering UE4

#### Vorraussetzungen:
 - MySQL server auf Port 3306 mit einer Datenbank namens "coronaDB" (Tabellen oder Daten müssen keine vorhanden sein)
 - Node.js installiert: [node.js](https://nodejs.org/en/)
 - Angular installiert mit `npm install -g @angular/cli`
 - Nest installiert mit `npm install -g @nestjs/cli`

#### Installation

Commandline in dem Ordner Backend öffnen
 - `npm install`
 - `npm run start` (Hier muss der MySQL server bereits auf Port 3306 laufen)
 
Commandline in dem Ordner Frontend öffnen
 - `npm install`
 - `ng serve`

#### Die Resourcen
 
Der API Server startet auf [localhost:3000](http://localhost:3000)

Die Swagger Dokumentation der Api ist auf [/docs](http://localhost:3000/docs) zu finden.

API endpoint ist [/api](http://localhost:3000/api)

Der Angular Webserver startet auf [localhost:4200](http://localhost:4200)
