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
tabnew
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
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd w
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
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe '1resize ' . ((&lines * 5 + 47) / 94)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 84 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 87 + 182) / 365)
exe '4resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 4resize ' . ((&columns * 90 + 182) / 365)
exe '5resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 90 + 182) / 365)
exe '6resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 101 + 182) / 365)
exe '7resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 101 + 182) / 365)
exe '8resize ' . ((&lines * 22 + 47) / 94)
exe 'vert 8resize ' . ((&columns * 101 + 182) / 365)
exe '9resize ' . ((&lines * 25 + 47) / 94)
exe 'vert 9resize ' . ((&columns * 101 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 53 - ((2 * winheight(0) + 2) / 5)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
53
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
let s:l = 149 - ((26 * winheight(0) + 42) / 84)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
149
normal! 05|
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
3
normal! zo
24
normal! zo
40
normal! zo
42
normal! zo
let s:l = 115 - ((82 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
115
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/objects/chunk.js") | buffer ~/cursus/proceduland/js/objects/chunk.js | else | edit ~/cursus/proceduland/js/objects/chunk.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/eventsControl.js") | buffer ~/cursus/proceduland/js/eventsControl.js | else | edit ~/cursus/proceduland/js/eventsControl.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=4
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 52 - ((25 * winheight(0) + 22) / 44)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
52
normal! 05|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/materials.js") | buffer ~/cursus/proceduland/js/materials.js | else | edit ~/cursus/proceduland/js/materials.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=2
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 57 - ((19 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
57
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/tools.js") | buffer ~/cursus/proceduland/js/tools.js | else | edit ~/cursus/proceduland/js/tools.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=2
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 10) / 20)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
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
let s:l = 34 - ((17 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
34
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=101 ++rows=25 
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 12) / 25)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
5wincmd w
exe '1resize ' . ((&lines * 5 + 47) / 94)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 84 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 87 + 182) / 365)
exe '4resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 4resize ' . ((&columns * 90 + 182) / 365)
exe '5resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 90 + 182) / 365)
exe '6resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 101 + 182) / 365)
exe '7resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 101 + 182) / 365)
exe '8resize ' . ((&lines * 22 + 47) / 94)
exe 'vert 8resize ' . ((&columns * 101 + 182) / 365)
exe '9resize ' . ((&lines * 25 + 47) / 94)
exe 'vert 9resize ' . ((&columns * 101 + 182) / 365)
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
wincmd w
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 110 + 182) / 365)
exe '2resize ' . ((&lines * 76 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 13 + 47) / 94)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 42 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 47 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=7
setlocal fml=1
setlocal fdn=20
setlocal fen
19
normal! zo
21
normal! zo
28
normal! zo
30
normal! zo
92
normal! zo
96
normal! zo
111
normal! zo
125
normal! zo
134
normal! zo
145
normal! zo
149
normal! zo
152
normal! zo
156
normal! zo
156
normal! zo
156
normal! zo
166
normal! zo
170
normal! zo
171
normal! zo
let s:l = 87 - ((45 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
87
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/chunk.js") | buffer ~/cursus/proceduland/js/webworkers/chunk.js | else | edit ~/cursus/proceduland/js/webworkers/chunk.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=2
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 48 - ((47 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
48
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/algo/andresCircle.js") | buffer ~/cursus/proceduland/js/algo/andresCircle.js | else | edit ~/cursus/proceduland/js/algo/andresCircle.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
2
normal! zo
18
normal! zo
let s:l = 59 - ((12 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
59
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/btt.js") | buffer ~/cursus/proceduland/js/webworkers/btt.js | else | edit ~/cursus/proceduland/js/webworkers/btt.js | endif
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
24
normal! zo
65
normal! zo
89
normal! zo
101
normal! zo
109
normal! zo
109
normal! zo
109
normal! zo
let s:l = 108 - ((56 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
108
normal! 02|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/webworkers/landGeometry.js") | buffer ~/cursus/proceduland/js/webworkers/landGeometry.js | else | edit ~/cursus/proceduland/js/webworkers/landGeometry.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 24 - ((23 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
24
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=84 ++rows=47 
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 110 + 182) / 365)
exe '2resize ' . ((&lines * 76 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 13 + 47) / 94)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 42 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 47 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
tabnext
edit ~/cursus/proceduland/js/algo/andresCircle.js
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 176 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 188 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=5
setlocal fml=1
setlocal fdn=20
setlocal fen
2
normal! zo
7
normal! zo
18
normal! zo
29
normal! zo
let s:l = 44 - ((43 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
44
normal! 09|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/tools.js") | buffer ~/cursus/proceduland/js/tools.js | else | edit ~/cursus/proceduland/js/tools.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=2
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 41 - ((39 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
41
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 176 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 188 + 182) / 365)
tabnext
edit ~/cursus/proceduland/js/libs/voronoi/voronoi.js
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
wincmd _ | wincmd |
split
1wincmd k
wincmd w
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 110 + 182) / 365)
exe '2resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 50 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
exe '7resize ' . ((&lines * 39 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 84 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
5
normal! zo
21
normal! zo
22
normal! zo
35
normal! zo
46
normal! zo
49
normal! zo
51
normal! zo
57
normal! zo
58
normal! zo
63
normal! zo
68
normal! zo
75
normal! zo
77
normal! zo
85
normal! zo
135
normal! zo
165
normal! zo
167
normal! zo
169
normal! zo
186
normal! zo
198
normal! zo
215
normal! zo
247
normal! zo
270
normal! zo
294
normal! zo
316
normal! zo
328
normal! zo
339
normal! zo
let s:l = 41 - ((40 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
41
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/libs/voronoi/edge.js") | buffer ~/cursus/proceduland/js/libs/voronoi/edge.js | else | edit ~/cursus/proceduland/js/libs/voronoi/edge.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
let s:l = 19 - ((18 * winheight(0) + 22) / 44)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
19
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/libs/voronoi/point.js") | buffer ~/cursus/proceduland/js/libs/voronoi/point.js | else | edit ~/cursus/proceduland/js/libs/voronoi/point.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
let s:l = 10 - ((9 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
10
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/vpolygon.js") | buffer ~/cursus/proceduland/vpolygon.js | else | edit ~/cursus/proceduland/vpolygon.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 22) / 44)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/libs/voronoi/parabola.js") | buffer ~/cursus/proceduland/js/libs/voronoi/parabola.js | else | edit ~/cursus/proceduland/js/libs/voronoi/parabola.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
13
normal! zo
14
normal! zo
18
normal! zo
22
normal! zo
27
normal! zo
let s:l = 7 - ((6 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
7
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/libs/voronoi/queue.js") | buffer ~/cursus/proceduland/js/libs/voronoi/queue.js | else | edit ~/cursus/proceduland/js/libs/voronoi/queue.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
9
normal! zo
14
normal! zo
19
normal! zo
25
normal! zo
28
normal! zo
30
normal! zo
39
normal! zo
44
normal! zo
let s:l = 27 - ((26 * winheight(0) + 25) / 50)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
27
normal! 05|
lcd ~/cursus/proceduland
wincmd w
argglobal
if bufexists("~/cursus/proceduland/js/libs/voronoi/event.js") | buffer ~/cursus/proceduland/js/libs/voronoi/event.js | else | edit ~/cursus/proceduland/js/libs/voronoi/event.js | endif
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
3
normal! zo
13
normal! zo
let s:l = 6 - ((5 * winheight(0) + 19) / 39)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 031|
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 110 + 182) / 365)
exe '2resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe '4resize ' . ((&lines * 44 + 47) / 94)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 45 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 84 + 182) / 365)
exe '6resize ' . ((&lines * 50 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 84 + 182) / 365)
exe '7resize ' . ((&lines * 39 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 84 + 182) / 365)
tabnext 1
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +1 ~/cursus/proceduland/js/libs/voronoi/voronoi.js
badd +1 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +1 ~/cursus/proceduland/js/eventsControl.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +1 ~/cursus/proceduland/js/tools.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +23 ~/cursus/proceduland/js/webworkers/landGeometry.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/edge.js
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
badd +0 ~/cursus/proceduland/js/objects/chunk.js
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
