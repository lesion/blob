- [ ] documentare installazione in maniera easy
- [ ] import / export opml
- [ ] finire l'aggiunta di un singolo post (notifica verde, forse aggiungere la fonte?)
- [ ] cose succede se aggiungo un post gia' esistente?
- [ ] gestione degli utenti?
- [ ] nei post faccio un numero massimo di tags
- [ ] settings custom post da confermare su anonimo
- [ ] settings custom post solo per utenti
- [ ] add color property to sources ?
- [ ] add global color settings
- [ ] commenti?


## how to convert images
<!-- for i in *.png; do
        # check if this file already have a webp
        orig=$(basename  `basename $i .png` .jpg)
        if [ ! -f $orig.webp ]; then
                #echo "$orig.webp non esiste lo faccio";
                echo "convert ";
                convert -resize 500 $orig.png $orig.webp;
                convert -resize 500 $orig.png $orig.jpg;
        else
                echo "ESISTE";
        fi;
done -->