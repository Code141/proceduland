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
exe '1resize ' . ((&lines * 11 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 80 + 48) / 96)
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
let s:l = 5 - ((4 * winheight(0) + 5) / 11)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
5
normal! 022|
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
30
normal! zo
124
normal! zo
124
normal! zc
let s:l = 75 - ((27 * winheight(0) + 40) / 80)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
75
normal! 021|
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
42
normal! zo
64
normal! zo
69
normal! zo
75
normal! zo
let s:l = 49 - ((45 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
49
normal! 045|
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
40
normal! zo
43
normal! zo
43
normal! zo
53
normal! zo
53
normal! zo
55
normal! zo
55
normal! zo
64
normal! zo
let s:l = 40 - ((38 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
40
normal! 09|
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
let s:l = 21 - ((19 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
21
normal! 017|
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
74
normal! zc
let s:l = 23 - ((11 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
23
normal! 020|
lcd ~/cursus/proceduland
wincmd w
2wincmd w
exe '1resize ' . ((&lines * 11 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 80 + 48) / 96)
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
exe 'vert 1resize ' . ((&columns * 92 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 64 + 182) / 365)
exe '3resize ' . ((&lines * 19 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 96 + 182) / 365)
exe '4resize ' . ((&lines * 72 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 96 + 182) / 365)
exe 'vert 5resize ' . ((&columns * 110 + 182) / 365)
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
let s:l = 145 - ((84 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
145
normal! 0
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
31
normal! zo
40
normal! zo
55
normal! zo
72
normal! zo
82
normal! zo
86
normal! zo
90
normal! zo
101
normal! zo
110
normal! zo
132
normal! zo
139
normal! zo
148
normal! zo
160
normal! zo
162
normal! zo
174
normal! zo
197
normal! zo
216
normal! zo
227
normal! zc
263
normal! zc
273
normal! zo
273
normal! zc
384
normal! zo
384
normal! zc
let s:l = 178 - ((84 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
178
normal! 017|
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
let s:l = 23 - ((13 * winheight(0) + 9) / 19)
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
43
normal! zo
43
normal! zo
53
normal! zo
53
normal! zo
55
normal! zo
55
normal! zo
let s:l = 54 - ((41 * winheight(0) + 36) / 72)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
54
normal! 0
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
2
normal! zo
31
normal! zo
let s:l = 36 - ((35 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
36
normal! 027|
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 92 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 64 + 182) / 365)
exe '3resize ' . ((&lines * 19 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 96 + 182) / 365)
exe '4resize ' . ((&lines * 72 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 96 + 182) / 365)
exe 'vert 5resize ' . ((&columns * 110 + 182) / 365)
tabnext 1
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +28 ~/cursus/proceduland/js/objects/chunk.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +32 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +0 ~/cursus/proceduland/js/webworkers/chunk.js
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
badd +20 ~/cursus/proceduland/js/objects/sky.js
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
