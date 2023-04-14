# LB B Dokumentation

## Um was geht es in diesem Dokument?

Ich habe als Auftrag ein Frontend für ein Backend geschrieben, in welchem es darum geht ein Programm für eine Task Liste zu erstellen.

## Wie benutzt man dieses Frontend?

1. Man startet damit, dass man den Docker Container auf dem Port 3000 aufstartet und danach die Erste Seite (das login.html) mit einem Life-Server aufstartet

2. Nachdem man auf dem Life Server ist, kann man eine Email und ein Passwort eingeben, dass Passwort ist m294 und auf die Email kommt es nicht darauf an, man muss nur darauf schauen, dass diese halt eine Email ist sonst wird diese nicht akzeptiert.

3. Nachdem wird man redirected auf die Main Page und ab da kann man diese einfach entdecken und seine Tasks und alle Dinge hinzufügen.

4. Wenn man nach einer speziellen Task suchen will, dann kann man in der URL #searchTask eingeben und dann wird man auf die Single Page weitergeleitet

5. Nachdem man auf dieser ist kann man in der URL #number=7 z.B. eingeben und dann kommt schon die Gewünschte Task ACHTUNG! Wenn man die Gleiche nochmals aufsuchen will, dann muss man zuerst auf eine andere und danach wieder zurück, ein bisschen umständlich aber es funktioniert

## Wichtige Informationen

1. Manchmal werden nicht immer die richtigen Errors oder fast keine Beschreibung zu diesen angegeben, wenn so etwas vorkommt, dann kann man in die Konsole schauen, dort kann eine bessere Anleitung stehen, aber es kann auch sein, dass die Eingabe zu gross ist.

## Pages

Ich habe drei Pages, diese sind die normale Seite get.html, login.html und specificData.html. Aber was sind diese?

### login.html

Dieses ist einfach dafür da um sich einzuloggen.

### get.html

Man kann sagen, dass diese die Main Page ist und hier kann man die meisten Dinge machen, wie Tasks verändern, löschen oder diese Hinzufügen.

### specificData.html

In dieser kann man spezifische Tasks suchen und auch diese verändern oder löschen. Man macht dies, wie schon oben erwähnt mit dem #number={yournumber}.

## Das Problem mit den ID's

Wenn man nach verschiedenen ID's suchen will, dann gibt es ein Problem. Durch die Entscheidung des Entwicklers des Backends, werden die alten gelöschten ID's nicht erneut benutzt, dass heisst, dass diese nicht mehr benutzbar sind. Das heisst es werden immer grössere ID's hinzugefügt und man muss diese auch benutzen.

## Test Cases

### Test Cases für Login

#### Erwartung Login

1. Beim Login soll der JSON Web Token übergeben, wenn das richtige Password eingegeben wurde.

2. Wenn man ein falsches Passwort eingibt sollte eine Meldung auftauchen, welche einem Hinweist, welches Passwort man eingeben sollte.

3. Wenn man eine falsche email eingibt, dann wird man darauf hingewiesen, dass man eine richtige Email eingeben sollte.

#### Realität Login

1. Erfüllt, es wird ein Web Token übergeben.

2. Erfüllt, es wird darauf hingewiesen.

3. Erfüllt, es wird auch darauf hingewiesen.

### Test Cases für Hautptseite

#### Erwartung Hauptseite

1. Ohne JSON Webtoken kann man nicht darauf zugreifen und man wird danach auf die Hauptseite zurückgeleitet.

2. Als User kann man sich eine Liste von Tasks anzeigen lassen mit Get.

3. Als User kann man Tasks erstellen mit Post.

4. Als user kann man Tasks bearbeiten mit Put oder Patch.

5. Als User kann man Tasks löschen mit Delete.

6. Die Formulare sind alle vollständig und die Daten werden korrekt übermittelt.

#### Realität Hauptseite

1. Erfüllt, man wird auch zurückgeleitet auf die Login Seite.

2. Erfüllt, man kann sich eine Task Liste anzeigen lassen

3. Erfüllt, man kann sich Tasks erstellen.

4. Erfüllt, man kann seine Tasks bearbeiten.

5. Erfüllt, man kann seine Tasks auch löschen und danach werden diese auch nicht mehr in der Hauptseite dargestellt.

6. Erfüllt, alle Daten werden erfolgreich übermittelt.

### Single Search Page

#### Erwartung Single Search Page

1. Man sollte eine Task mit #number={your number} suchen können.

2. Man sollte die Dargestellt Task bearbeiten können.

3. Man sollte die Dargestellte Task löschen können.

4. Wenn man ohne JWT auf die Seite geht, dann sollte man auf die Login Seite zurückgeleitet werden.

#### Single Page Realität

1. Erfüllt, man kann eine Task darüber suchen.

2. Erfüllt, man kann auch die Task als User bearbeiten.

3. Erfüllt, man kann die Tasks als User löschen.

4. Erfüllt, man wird zurückgeleitet.
