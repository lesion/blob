- [ ] installation docs
- [ ] usage docs
- [ ] import / export opml
- [ ] test add post already there
- [ ] user management
- [ ] limit post tags?
- [ ] settings flag custom post?
- [ ] settings custom post?
- [ ] add color property to sources?
- [ ] add global color settings
- [ ] comments?



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