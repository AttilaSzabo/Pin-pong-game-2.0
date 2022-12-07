# Pin-pong-game-2.0

Egy Pong játék amely először 1972-ben került a játéktermekbe.
Most újra játszhatod számítogép ellen, vagy akár több játokosokkal is indíthattok egy turnajt.<br>

#####A link: https://2xjs5w.csb.app/

####Játék opciók leírása:
*Játékos a játékos ellen:*
   - Addig játsztok amíg valaki nem nyer.
   - Ha szeretnétek, akkor újrajátszhatjátok a játékot. 
  
*Játékos a számítógép ellen:*
  - Addig játszol amíg nem nyersz vagy veszítesz a számítógép ellen.
  - Ha szeretnétek, akkor újrajátszhatjátok a játékot. 

*Tournaj indítása:*
  - Minimum 2-en kell, hogy játszák a játékot.
  - Maximum 8-an játszhatják a játékot.
  - Páratlanul nem indíthattok tournajt.
  - A nevek beadása után vagy az **Enter** gomb lenyomásával, vagy a **send** gomb lenyomásával adhatjátok meg a neveiteket.
  - A **Start** gomb megnyomásával a játék elindul.
  - A képernyőre kiíródik, hogy ki kivel játszik.
  - Amenniyben valaki veszít, a játékból kiesik, végül a győztes marad.
  - Ha szeretnétek, akkor újrajátszhatjátok a játékot. 


####A program leírása:
- 1-2 sor A pályához a Canvas
- 3-4 sor A játékosok kiiratására a Canvas.
- 23 sor A labda kezdeti sebessége.
- 24 sor Az ütők kezdeti sebessége.
  
***sendName** fügvény:*
  - Beküldöm a játékosok neveit, számokat nem adhatnak meg, maximálisan 8-an lehetnek.
  
***drawingBall** fügvény:*
  - Megrajzolom a Canvas segítségével a labdát, és megadom   neki a pozícióját.

***contestants** fügvény:*
  - Megrajzolom a pályát amibe beiratom a versenyzőket akik egymás ellen játszanak.

***drawingPlayersScore** fügvény:*
  - Megrajzolom a pályát amiben megjelenítettetem a játékosok pontszámait.

***drawingRacket** fügvény:*
  - Megrajzolom a pályát amiben megjelenítettetem a játékosok ütőit, amivel visszaütik a labdát.

***middleOfTheTrack** fügvény:*
  - Megrajzolom a pálya közepét.

***randomDirection** fügvény:*
  - Megadom a labda kezdeti pozícióját, és a Math Random segítségével véletlenszerüen, pozitív vagy negatív számot kigenerálok
  - Ami véletlenszerűen elmozdítja a labdát valamellyik irányba. 
  - Ezt csak egyszer hívom meg a **game** fügvényen kívül.Ha a fügvényen belül hívnám meg, akkor a labda csak egy helyben toporzékolna.

***ballLaunch** fügvény:*
  - Hozzáadom a labda x x pozíciójához a véletlenszerű számot, ami álltal a labda elmozdul valamelly irányba.
  - lekezelem, hogy a labda a fenti és az alsó falról visszapattanjon.
  - lekezelem hogy-ha a labda valamellyik oldalon kimegy, akkor újrapozicionálja a labdát, és beírjon egy pontszámot a nyertes játékosnak.
  - lekezelem hogy-ha a labda és az ütő pont ott vannak, akkor a labda visszapattanjon.

***addEventListener** keydown:*
  - Megadom a pontos billentyűzetet, amivel a két játékos az ütőket irányítják.
  - Amennyiben a helyes gombot lenyomják az értékeket áttállítom **true-ra**.

***addEventListener** keyup:*
  - Megadott billenytűzetek az elengedésül után, visszaállítom **false-ra**.
  - Így az ütők nem mozognak.

***movingRacket** fügvény:*
  - Amennyiben **true** valamellyik irány az ütőt elmozdítom a megaott kezdeti sebességgel abba az irányba, amelyik gombot lenyomja a játékos.

***edgeOfTheField** fügvény:*
  - Amennyiben az ütők elérték a pálya szélét, az értéket áttállítom **false-ra**, hogy ne tudjon kimenni a pályán kívülre.

  ***makeItTrue** fügvény:*
  - Amennyiben elérte a játékos a megadott pontszámot a nyeréshez, akkor az értékeket beállítom **true-ra**.
  - Majd mindent visszaállítok a kezdeti pozícióba, és a pontszámokat kinullázom.

 ***eliminationGame** fügvény:*
  - Amennyiben valamellyik játékos igaz, akkor beillesztem őt a **winners** listába.
  - Majd kitörlöm az első és az utolsó értéket.
  - Megnézem a pálya hosszát, hogy csak addig írja ki a kiesett játékosokat amíg a **playersName** hossza nagyobb mint 1.
  - Ha nem vizsgálnám meg akkor kiírna hogy undefined.
  - Ha nincs a  **playersName** listában érték, akkor egyenlővé teszem a két listát, és újjból indul a kör.
  - Amenniyben a **playersName** egyenlő 1-el, akkor kiiratom a győztest, majd mindent kinulázok.

 ***game** fügvény:*
  - Úgy indítom el a játékot hogy a  **playersName** hossza nagyobb mint 1.
  - Amennyiben a hossza nem nagyobb mint egy, akkor ajáték megáll, nem folytatódik üres játékosokkal.
  - Megkell adni újjból játékosokat a játékhoz.

 ***startGame** fügvény:*
  - Amennyiben minden feltétel helyes, akkor indul a játék.
  - Addig nem engedem megnyomni újjból a játékot amíg a **input** ismét nem 0 és a **playersName** hossza nem nagyobb mint 1.