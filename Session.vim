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
exe '1resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 66 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 26 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 110 + 182) / 365)
exe '7resize ' . ((&lines * 25 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 110 + 182) / 365)
exe '8resize ' . ((&lines * 39 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 110 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 6 - ((5 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/init.js") | buffer ~/cursus/proceduland/js/init.js | else | edit ~/cursus/proceduland/js/init.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
124
normal! zo
124
normal! zc
let s:l = 59 - ((58 * winheight(0) + 33) / 66)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
59
normal! 042|
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=84 ++rows=12 
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/world.js") | buffer ~/cursus/proceduland/js/objects/world.js | else | edit ~/cursus/proceduland/js/objects/world.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
19
normal! zo
21
normal! zo
36
normal! zo
38
normal! zo
58
normal! zo
67
normal! zo
67
normal! zo
71
normal! zo
72
normal! zo
84
normal! zo
let s:l = 42 - ((41 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
42
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/chunk.js") | buffer ~/cursus/proceduland/js/objects/chunk.js | else | edit ~/cursus/proceduland/js/objects/chunk.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
9
normal! zo
24
normal! zo
let s:l = 41 - ((40 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
41
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/materials.js") | buffer ~/cursus/proceduland/js/materials.js | else | edit ~/cursus/proceduland/js/materials.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 15 - ((11 * winheight(0) + 13) / 26)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
15
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/algo/andresCircle.js") | buffer ~/cursus/proceduland/js/algo/andresCircle.js | else | edit ~/cursus/proceduland/js/algo/andresCircle.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
2
normal! zo
16
normal! zo
let s:l = 18 - ((7 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/gui.js") | buffer ~/cursus/proceduland/js/gui.js | else | edit ~/cursus/proceduland/js/gui.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
69
normal! zo
69
normal! zc
let s:l = 38 - ((29 * winheight(0) + 19) / 39)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
38
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe '1resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 66 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 26 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 110 + 182) / 365)
exe '7resize ' . ((&lines * 25 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 110 + 182) / 365)
exe '8resize ' . ((&lines * 39 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 110 + 182) / 365)
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
exe 'vert 2resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 92 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=7
setlocal fml=1
setlocal fdn=20
setlocal fen
18
normal! zo
20
normal! zo
28
normal! zo
33
normal! zo
34
normal! zc
62
normal! zo
66
normal! zo
170
normal! zo
let s:l = 68 - ((31 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
68
normal! 032|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/bone.js") | buffer ~/cursus/proceduland/js/webworkers/bone.js | else | edit ~/cursus/proceduland/js/webworkers/bone.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
43
normal! zo
45
normal! zo
let s:l = 50 - ((49 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
50
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk.js") | buffer ~/cursus/proceduland/js/webworkers/chunk.js | else | edit ~/cursus/proceduland/js/webworkers/chunk.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=8
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 63 - ((62 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
63
normal! 06|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/landGeometry.js") | buffer ~/cursus/proceduland/js/webworkers/landGeometry.js | else | edit ~/cursus/proceduland/js/webworkers/landGeometry.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 37 - ((36 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
37
normal! 06|
lcd ~/cursus/proceduland
wincmd w
4wincmd w
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 92 + 182) / 365)
tabnext 2
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +55 ~/cursus/proceduland/js/objects/chunk.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +32 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +1 ~/cursus/proceduland/js/webworkers/bone.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk.js
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
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
