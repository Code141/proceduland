let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
exe "cd " . escape(expand("<sfile>:p:h"), ' ')
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
$argadd ~/cursus/proceduland/js
tabnew
tabrewind
edit index.html
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
3wincmd h
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
3wincmd k
wincmd w
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd w
wincmd _ | wincmd |
split
wincmd _ | wincmd |
split
2wincmd k
wincmd w
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 1resize ' . ((&columns * 91 + 182) / 365)
exe '2resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 2resize ' . ((&columns * 91 + 182) / 365)
exe '3resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 3resize ' . ((&columns * 91 + 182) / 365)
exe '4resize ' . ((&lines * 25 + 47) / 95)
exe 'vert 4resize ' . ((&columns * 91 + 182) / 365)
exe '5resize ' . ((&lines * 43 + 47) / 95)
exe 'vert 5resize ' . ((&columns * 91 + 182) / 365)
exe '6resize ' . ((&lines * 47 + 47) / 95)
exe 'vert 6resize ' . ((&columns * 91 + 182) / 365)
exe 'vert 7resize ' . ((&columns * 90 + 182) / 365)
exe '8resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 8resize ' . ((&columns * 90 + 182) / 365)
exe '9resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 9resize ' . ((&columns * 90 + 182) / 365)
exe '10resize ' . ((&lines * 87 + 47) / 95)
exe 'vert 10resize ' . ((&columns * 90 + 182) / 365)
argglobal
let s:l = 22 - ((7 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
22
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/eventsControl.js") | buffer ~/cursus/proceduland/js/eventsControl.js | else | edit ~/cursus/proceduland/js/eventsControl.js | endif
let s:l = 1 - ((0 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/init.js") | buffer ~/cursus/proceduland/js/init.js | else | edit ~/cursus/proceduland/js/init.js | endif
let s:l = 1 - ((0 * winheight(0) + 10) / 21)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/index.js") | buffer ~/cursus/proceduland/index.js | else | edit ~/cursus/proceduland/index.js | endif
let s:l = 1 - ((0 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/proceduland.js") | buffer ~/cursus/proceduland/js/objects/proceduland.js | else | edit ~/cursus/proceduland/js/objects/proceduland.js | endif
let s:l = 57 - ((26 * winheight(0) + 21) / 43)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
57
normal! 016|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/world.js") | buffer ~/cursus/proceduland/js/objects/world.js | else | edit ~/cursus/proceduland/js/objects/world.js | endif
let s:l = 12 - ((8 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
12
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/chunk.js") | buffer ~/cursus/proceduland/js/objects/chunk.js | else | edit ~/cursus/proceduland/js/objects/chunk.js | endif
let s:l = 63 - ((59 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
63
normal! 05|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/materials.js") | buffer ~/cursus/proceduland/js/materials.js | else | edit ~/cursus/proceduland/js/materials.js | endif
let s:l = 64 - ((0 * winheight(0) + 0) / 1)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
64
normal! 03|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/algo/andresCircle.js") | buffer ~/cursus/proceduland/js/algo/andresCircle.js | else | edit ~/cursus/proceduland/js/algo/andresCircle.js | endif
let s:l = 4 - ((0 * winheight(0) + 0) / 1)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
4
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/gui.js") | buffer ~/cursus/proceduland/js/gui.js | else | edit ~/cursus/proceduland/js/gui.js | endif
let s:l = 11 - ((10 * winheight(0) + 43) / 87)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
11
normal! 0
lcd ~/cursus/proceduland
wincmd w
10wincmd w
exe '1resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 1resize ' . ((&columns * 91 + 182) / 365)
exe '2resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 2resize ' . ((&columns * 91 + 182) / 365)
exe '3resize ' . ((&lines * 21 + 47) / 95)
exe 'vert 3resize ' . ((&columns * 91 + 182) / 365)
exe '4resize ' . ((&lines * 25 + 47) / 95)
exe 'vert 4resize ' . ((&columns * 91 + 182) / 365)
exe '5resize ' . ((&lines * 43 + 47) / 95)
exe 'vert 5resize ' . ((&columns * 91 + 182) / 365)
exe '6resize ' . ((&lines * 47 + 47) / 95)
exe 'vert 6resize ' . ((&columns * 91 + 182) / 365)
exe 'vert 7resize ' . ((&columns * 90 + 182) / 365)
exe '8resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 8resize ' . ((&columns * 90 + 182) / 365)
exe '9resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 9resize ' . ((&columns * 90 + 182) / 365)
exe '10resize ' . ((&lines * 87 + 47) / 95)
exe 'vert 10resize ' . ((&columns * 90 + 182) / 365)
tabnext
edit ~/cursus/proceduland/js/webworkers/worldWorker.js
set splitbelow splitright
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
wincmd _ | wincmd |
vsplit
3wincmd h
wincmd w
wincmd w
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 88 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 90 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 100 + 182) / 365)
argglobal
let s:l = 72 - ((43 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
72
normal! 025|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/bone.js") | buffer ~/cursus/proceduland/js/webworkers/bone.js | else | edit ~/cursus/proceduland/js/webworkers/bone.js | endif
let s:l = 245 - ((58 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
245
normal! 041|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk.js") | buffer ~/cursus/proceduland/js/webworkers/chunk.js | else | edit ~/cursus/proceduland/js/webworkers/chunk.js | endif
let s:l = 395 - ((52 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
395
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/landGeometry.js") | buffer ~/cursus/proceduland/js/webworkers/landGeometry.js | else | edit ~/cursus/proceduland/js/webworkers/landGeometry.js | endif
let s:l = 40 - ((39 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
40
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 88 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 90 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 100 + 182) / 365)
tabnext 1
badd +15 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +39 ~/cursus/proceduland/js/eventsControl.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/index.js
badd +1 ~/cursus/proceduland/js/objects/proceduland.js
badd +57 ~/cursus/proceduland/js/objects/world.js
badd +55 ~/cursus/proceduland/js/objects/chunk.js
badd +0 ~/cursus/proceduland/js/materials.js
badd +32 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +1 ~/cursus/proceduland/js/webworkers/bone.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/webworkers/landGeometry.js
badd +1 ~/cursus/proceduland/js/objects/sky.js
badd +1 ~/cursus/proceduland/js/objects/test.js
badd +37 ~/cursus/proceduland/js/webworkers/chunk_2.js
badd +1 ~/cursus/proceduland/js/loader.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +1 ~/cursus/proceduland/js/tools.js
badd +509 ~/cursus/proceduland/js/libs/voronoi/voronoi.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/edge.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/point.js
badd +1 ~/cursus/proceduland/vpolygon.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/parabola.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/queue.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/event.js
badd +1 ~/cursus/proceduland/NetrwTreeListing\ 6
badd +1 ~/cursus/proceduland
badd +18 ~/cursus/proceduland/js/libs/three.min.js
badd +1 ~/cursus/proceduland/js/libs/three_105.min.js
badd +21 ~/cursus/proceduland/js/libs/coCoLog.js
badd +1 ~/cursus/proceduland/index.php
badd +1 ~/cursus/proceduland/js/algo
badd +27 ~/cursus/proceduland/js/libs/KeyboardState.js
badd +6 ~/cursus/proceduland/js/objects/voronoi.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/polygon.js
badd +197 ~/cursus/proceduland/js/libs/shader/SkyShader.js
badd +30 ~/cursus/proceduland/e
badd +1 ~/cursus/proceduland/n
badd +1 ~/cursus/proceduland/js/webworkers/chunk_squelet.js
badd +78 ~/cursus/proceduland/js/libs/Detector.js
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=5 winwidth=84 shortmess=filnxtToO
set winminheight=1 winminwidth=10
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
