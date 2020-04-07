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
2wincmd k
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
exe '1resize ' . ((&lines * 5 + 47) / 95)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 77 + 47) / 95)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 7 + 47) / 95)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 4resize ' . ((&columns * 115 + 182) / 365)
exe '5resize ' . ((&lines * 89 + 47) / 95)
exe 'vert 5resize ' . ((&columns * 115 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 71 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 47) / 95)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
exe '8resize ' . ((&lines * 30 + 47) / 95)
exe 'vert 8resize ' . ((&columns * 92 + 182) / 365)
exe '9resize ' . ((&lines * 29 + 47) / 95)
exe 'vert 9resize ' . ((&columns * 92 + 182) / 365)
argglobal
let s:l = 36 - ((2 * winheight(0) + 2) / 5)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
36
normal! 033|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/init.js") | buffer ~/cursus/proceduland/js/init.js | else | edit ~/cursus/proceduland/js/init.js | endif
let s:l = 75 - ((35 * winheight(0) + 38) / 77)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
75
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/index.js") | buffer ~/cursus/proceduland/index.js | else | edit ~/cursus/proceduland/index.js | endif
let s:l = 11 - ((2 * winheight(0) + 3) / 7)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
11
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/world.js") | buffer ~/cursus/proceduland/js/objects/world.js | else | edit ~/cursus/proceduland/js/objects/world.js | endif
let s:l = 99 - ((0 * winheight(0) + 0) / 1)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
99
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/test.js") | buffer ~/cursus/proceduland/js/objects/test.js | else | edit ~/cursus/proceduland/js/objects/test.js | endif
let s:l = 74 - ((42 * winheight(0) + 44) / 89)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
74
normal! 030|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/chunk.js") | buffer ~/cursus/proceduland/js/objects/chunk.js | else | edit ~/cursus/proceduland/js/objects/chunk.js | endif
let s:l = 39 - ((38 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
39
normal! 021|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/materials.js") | buffer ~/cursus/proceduland/js/materials.js | else | edit ~/cursus/proceduland/js/materials.js | endif
let s:l = 8 - ((7 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
8
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/algo/andresCircle.js") | buffer ~/cursus/proceduland/js/algo/andresCircle.js | else | edit ~/cursus/proceduland/js/algo/andresCircle.js | endif
let s:l = 18 - ((10 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/gui.js") | buffer ~/cursus/proceduland/js/gui.js | else | edit ~/cursus/proceduland/js/gui.js | endif
let s:l = 69 - ((17 * winheight(0) + 14) / 29)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
69
normal! 016|
lcd ~/cursus/proceduland
wincmd w
5wincmd w
exe '1resize ' . ((&lines * 5 + 47) / 95)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 77 + 47) / 95)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 7 + 47) / 95)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 1 + 47) / 95)
exe 'vert 4resize ' . ((&columns * 115 + 182) / 365)
exe '5resize ' . ((&lines * 89 + 47) / 95)
exe 'vert 5resize ' . ((&columns * 115 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 71 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 47) / 95)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
exe '8resize ' . ((&lines * 30 + 47) / 95)
exe 'vert 8resize ' . ((&columns * 92 + 182) / 365)
exe '9resize ' . ((&lines * 29 + 47) / 95)
exe 'vert 9resize ' . ((&columns * 92 + 182) / 365)
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
exe 'vert 2resize ' . ((&columns * 89 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 89 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 100 + 182) / 365)
argglobal
let s:l = 48 - ((31 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
48
normal! 08|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk.js") | buffer ~/cursus/proceduland/js/webworkers/chunk.js | else | edit ~/cursus/proceduland/js/webworkers/chunk.js | endif
let s:l = 432 - ((93 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
432
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/bone.js") | buffer ~/cursus/proceduland/js/webworkers/bone.js | else | edit ~/cursus/proceduland/js/webworkers/bone.js | endif
let s:l = 147 - ((83 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
147
normal! 016|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/landGeometry.js") | buffer ~/cursus/proceduland/js/webworkers/landGeometry.js | else | edit ~/cursus/proceduland/js/webworkers/landGeometry.js | endif
let s:l = 131 - ((90 * winheight(0) + 45) / 91)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
131
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 89 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 89 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 100 + 182) / 365)
tabnext 1
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +55 ~/cursus/proceduland/js/objects/chunk.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +32 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +0 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/webworkers/bone.js
badd +1 ~/cursus/proceduland/js/webworkers/landGeometry.js
badd +37 ~/cursus/proceduland/js/webworkers/chunk_2.js
badd +1 ~/cursus/proceduland/js/loader.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +1 ~/cursus/proceduland/js/tools.js
badd +509 ~/cursus/proceduland/js/libs/voronoi/voronoi.js
badd +39 ~/cursus/proceduland/js/eventsControl.js
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
badd +1 ~/cursus/proceduland/js/libs/KeyboardState.js
badd +6 ~/cursus/proceduland/js/objects/voronoi.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/polygon.js
badd +197 ~/cursus/proceduland/js/libs/shader/SkyShader.js
badd +30 ~/cursus/proceduland/e
badd +1 ~/cursus/proceduland/n
badd +20 ~/cursus/proceduland/js/objects/sky.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk_squelet.js
badd +0 ~/cursus/proceduland/index.js
badd +0 ~/cursus/proceduland/js/objects/test.js
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
