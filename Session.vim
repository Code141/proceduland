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
1wincmd k
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
exe '1resize ' . ((&lines * 10 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 81 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 93 + 182) / 365)
exe '5resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 92 + 182) / 365)
exe '6resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 92 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 7 - ((4 * winheight(0) + 5) / 10)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 046|
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
let s:l = 1 - ((0 * winheight(0) + 40) / 81)
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
21
normal! zo
23
normal! zo
38
normal! zo
40
normal! zo
41
normal! zo
64
normal! zo
69
normal! zo
75
normal! zo
let s:l = 11 - ((7 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
11
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
22
normal! zo
53
normal! zo
53
normal! zo
let s:l = 49 - ((47 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
49
normal! 014|
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
let s:l = 18 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
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
let s:l = 29 - ((17 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
29
normal! 029|
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
68
normal! zo
74
normal! zo
let s:l = 74 - ((7 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
74
normal! 038|
lcd ~/cursus/proceduland
wincmd w
exe '1resize ' . ((&lines * 10 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 81 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 93 + 182) / 365)
exe '5resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 92 + 182) / 365)
exe '6resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 92 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
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
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 79 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 27 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 64 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 110 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=7
setlocal fml=1
setlocal fdn=20
setlocal fen
21
normal! zo
23
normal! zo
30
normal! zo
82
normal! zo
90
normal! zo
90
normal! zo
96
normal! zo
96
normal! zo
99
normal! zo
110
normal! zo
114
normal! zo
121
normal! zo
121
normal! zo
121
normal! zo
132
normal! zo
133
normal! zo
157
normal! zo
161
normal! zo
let s:l = 44 - ((25 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
44
normal! 047|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk.js") | buffer ~/cursus/proceduland/js/webworkers/chunk.js | else | edit ~/cursus/proceduland/js/webworkers/chunk.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=7
setlocal fml=1
setlocal fdn=20
setlocal fen
8
normal! zo
24
normal! zo
26
normal! zo
41
normal! zo
55
normal! zo
99
normal! zo
104
normal! zo
111
normal! zo
114
normal! zo
155
normal! zo
162
normal! zo
180
normal! zo
180
normal! zo
182
normal! zo
198
normal! zo
198
normal! zo
216
normal! zo
216
normal! zo
227
normal! zo
242
normal! zo
242
normal! zo
245
normal! zo
245
normal! zo
255
normal! zo
255
normal! zo
274
normal! zc
309
normal! zc
319
normal! zo
319
normal! zc
430
normal! zo
430
normal! zc
let s:l = 306 - ((71 * winheight(0) + 39) / 79)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
306
normal! 0
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
let s:l = 3 - ((2 * winheight(0) + 6) / 12)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
3
let s:c = 7 - ((5 * winwidth(0) + 42) / 84)
if s:c > 0
  exe 'normal! ' . s:c . '|zs' . 7 . '|'
else
  normal! 07|
endif
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/btt.js") | buffer ~/cursus/proceduland/js/webworkers/btt.js | else | edit ~/cursus/proceduland/js/webworkers/btt.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
19
normal! zo
21
normal! zo
33
normal! zo
33
normal! zc
57
normal! zo
57
normal! zc
70
normal! zo
70
normal! zc
80
normal! zo
80
normal! zc
88
normal! zo
127
normal! zo
let s:l = 23 - ((19 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
23
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
41
normal! zo
53
normal! zo
53
normal! zo
let s:l = 64 - ((35 * winheight(0) + 32) / 64)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
64
normal! 013|
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
3
normal! zo
30
normal! zo
let s:l = 54 - ((53 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
54
normal! 047|
lcd ~/cursus/proceduland
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 79 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 12 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 27 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 64 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 110 + 182) / 365)
tabnext 2
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +28 ~/cursus/proceduland/js/objects/chunk.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +38 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +23 ~/cursus/proceduland/js/webworkers/landGeometry.js
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
badd +34 ~/cursus/proceduland/js/loader.js
badd +30 ~/cursus/proceduland/e
badd +1 ~/cursus/proceduland/n
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
