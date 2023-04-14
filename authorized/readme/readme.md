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
