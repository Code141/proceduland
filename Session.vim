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
exe '1resize ' . ((&lines * 5 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 105 + 182) / 365)
exe '2resize ' . ((&lines * 77 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 105 + 182) / 365)
exe '3resize ' . ((&lines * 8 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 105 + 182) / 365)
exe '4resize ' . ((&lines * 64 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 91 + 182) / 365)
exe '5resize ' . ((&lines * 27 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 91 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 82 + 182) / 365)
exe '8resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 82 + 182) / 365)
exe '9resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 9resize ' . ((&columns * 82 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 10 - ((2 * winheight(0) + 2) / 5)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
10
normal! 031|
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
47
normal! zo
124
normal! zo
124
normal! zc
let s:l = 37 - ((36 * winheight(0) + 38) / 77)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
37
normal! 039|
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=105 ++rows=8 
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 4) / 8)
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
63
normal! zo
71
normal! zo
72
normal! zo
84
normal! zo
let s:l = 49 - ((30 * winheight(0) + 32) / 64)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
49
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/loader.js") | buffer ~/cursus/proceduland/js/loader.js | else | edit ~/cursus/proceduland/js/loader.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 13) / 27)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
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
16
normal! zo
41
normal! zo
41
normal! zo
52
normal! zo
64
normal! zo
let s:l = 51 - ((50 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
51
normal! 026|
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
let s:l = 11 - ((10 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
11
normal! 02|
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
let s:l = 18 - ((8 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
18
normal! 018|
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
let s:l = 47 - ((29 * winheight(0) + 15) / 30)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
47
normal! 064|
lcd ~/cursus/proceduland
wincmd w
exe '1resize ' . ((&lines * 5 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 105 + 182) / 365)
exe '2resize ' . ((&lines * 77 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 105 + 182) / 365)
exe '3resize ' . ((&lines * 8 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 105 + 182) / 365)
exe '4resize ' . ((&lines * 64 + 48) / 96)
exe 'vert 4resize ' . ((&columns * 91 + 182) / 365)
exe '5resize ' . ((&lines * 27 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 91 + 182) / 365)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
exe '7resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 82 + 182) / 365)
exe '8resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 82 + 182) / 365)
exe '9resize ' . ((&lines * 30 + 48) / 96)
exe 'vert 9resize ' . ((&columns * 82 + 182) / 365)
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
exe 'vert 2resize ' . ((&columns * 124 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 70 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
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
83
normal! zo
90
normal! zo
90
normal! zo
117
normal! zo
128
normal! zo
128
normal! zo
128
normal! zo
128
normal! zo
140
normal! zo
164
normal! zo
168
normal! zo
let s:l = 48 - ((47 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
48
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk_2.js") | buffer ~/cursus/proceduland/js/webworkers/chunk_2.js | else | edit ~/cursus/proceduland/js/webworkers/chunk_2.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=6
setlocal fml=1
setlocal fdn=20
setlocal fen
12
normal! zo
14
normal! zo
36
normal! zo
52
normal! zo
71
normal! zo
126
normal! zo
126
normal! zo
139
normal! zo
141
normal! zo
143
normal! zo
151
normal! zo
151
normal! zo
151
normal! zo
151
normal! zo
156
normal! zo
156
normal! zo
156
normal! zo
156
normal! zo
156
normal! zo
160
normal! zo
160
normal! zo
160
normal! zo
162
normal! zo
162
normal! zo
162
normal! zo
206
normal! zo
206
normal! zo
206
normal! zo
211
normal! zo
211
normal! zo
211
normal! zo
215
normal! zo
219
normal! zo
228
normal! zo
228
normal! zo
228
normal! zo
228
normal! zo
228
normal! zo
let s:l = 188 - ((63 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
188
normal! 044|
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
16
normal! zo
41
normal! zo
41
normal! zo
52
normal! zo
64
normal! zo
let s:l = 54 - ((53 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
54
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
2
normal! zo
31
normal! zo
31
normal! zc
43
normal! zo
44
normal! zc
47
normal! zc
50
normal! zc
53
normal! zc
56
normal! zc
59
normal! zc
62
normal! zc
65
normal! zc
68
normal! zc
74
normal! zo
75
normal! zc
78
normal! zc
let s:l = 20 - ((19 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
20
normal! 021|
lcd ~/cursus/proceduland
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 124 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 70 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
tabnext 2
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +28 ~/cursus/proceduland/js/objects/chunk.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +32 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +75 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +0 ~/cursus/proceduland/js/webworkers/landGeometry.js
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
badd +0 ~/cursus/proceduland/js/webworkers/chunk_2.js
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
