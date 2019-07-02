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
exe '1resize ' . ((&lines * 1 + 47) / 94)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 88 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 87 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 90 + 182) / 365)
exe '5resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 101 + 182) / 365)
exe '6resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 101 + 182) / 365)
exe '7resize ' . ((&lines * 22 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 101 + 182) / 365)
exe '8resize ' . ((&lines * 25 + 47) / 94)
exe 'vert 8resize ' . ((&columns * 101 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 53 - ((0 * winheight(0) + 0) / 1)
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
setlocal fdl=3
setlocal fml=1
setlocal fdn=20
setlocal fen
28
normal! zo
143
normal! zo
159
normal! zo
173
normal! zo
let s:l = 155 - ((33 * winheight(0) + 44) / 88)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
155
normal! 015|
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
25
normal! zo
42
normal! zo
44
normal! zo
45
normal! zo
60
normal! zo
64
normal! zo
77
normal! zo
153
normal! zo
153
normal! zo
182
normal! zo
192
normal! zo
let s:l = 142 - ((82 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
142
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
let s:l = 43 - ((42 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
43
normal! 026|
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
exe '1resize ' . ((&lines * 1 + 47) / 94)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 88 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 87 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 90 + 182) / 365)
exe '5resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 5resize ' . ((&columns * 101 + 182) / 365)
exe '6resize ' . ((&lines * 20 + 47) / 94)
exe 'vert 6resize ' . ((&columns * 101 + 182) / 365)
exe '7resize ' . ((&lines * 22 + 47) / 94)
exe 'vert 7resize ' . ((&columns * 101 + 182) / 365)
exe '8resize ' . ((&lines * 25 + 47) / 94)
exe 'vert 8resize ' . ((&columns * 101 + 182) / 365)
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
exe '2resize ' . ((&lines * 47 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 42 + 47) / 94)
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
21
normal! zo
23
normal! zo
30
normal! zo
32
normal! zo
93
normal! zo
97
normal! zo
112
normal! zo
126
normal! zo
137
normal! zo
148
normal! zo
152
normal! zo
159
normal! zo
159
normal! zo
170
normal! zo
174
normal! zo
175
normal! zo
191
normal! zo
194
normal! zo
195
normal! zo
219
normal! zo
let s:l = 163 - ((31 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
163
normal! 09|
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
let s:l = 67 - ((11 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
67
normal! 06|
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
46
normal! zo
48
normal! zo
51
normal! zo
let s:l = 174 - ((32 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
174
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
24
normal! zo
26
normal! zo
65
normal! zo
99
normal! zo
99
normal! zo
let s:l = 99 - ((40 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
99
normal! 0
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
normal! 022|
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
let s:l = 15 - ((14 * winheight(0) + 23) / 47)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
15
let s:c = 45 - ((2 * winwidth(0) + 42) / 84)
if s:c > 0
  exe 'normal! ' . s:c . '|zs' . 45 . '|'
else
  normal! 045|
endif
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 110 + 182) / 365)
exe '2resize ' . ((&lines * 47 + 47) / 94)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 42 + 47) / 94)
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
3
normal! zo
9
normal! zo
38
normal! zo
46
normal! zo
48
normal! zo
51
normal! zo
62
normal! zo
78
normal! zo
83
normal! zo
89
normal! zo
119
normal! zo
let s:l = 137 - ((64 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
137
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
79
normal! zo
93
normal! zo
125
normal! zo
154
normal! zo
166
normal! zo
167
normal! zo
169
normal! zo
173
normal! zo
174
normal! zo
176
normal! zo
185
normal! zo
188
normal! zo
190
normal! zo
195
normal! zo
197
normal! zo
202
normal! zo
223
normal! zo
234
normal! zo
239
normal! zo
248
normal! zo
257
normal! zo
281
normal! zo
285
normal! zo
293
normal! zo
298
normal! zo
303
normal! zo
307
normal! zo
315
normal! zo
319
normal! zo
326
normal! zo
333
normal! zo
341
normal! zo
let s:l = 14 - ((13 * winheight(0) + 45) / 90)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
14
normal! 017|
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
6
normal! zo
14
normal! zo
18
normal! zo
23
normal! zo
27
normal! zo
32
normal! zo
let s:l = 28 - ((27 * winheight(0) + 22) / 44)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
28
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
2wincmd w
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
tabnext 4
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
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
badd +1 ~/cursus/proceduland/NetrwTreeListing\ 6
badd +1 ~/cursus/proceduland
badd +18 ~/cursus/proceduland/js/libs/three.min.js
badd +1 ~/cursus/proceduland/js/libs/three_105.min.js
badd +21 ~/cursus/proceduland/js/libs/coCoLog.js
badd +1 ~/cursus/proceduland/index.php
badd +1 ~/cursus/proceduland/js/algo
badd +1 ~/cursus/proceduland/js/libs/KeyboardState.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/voronoi.js
badd +0 ~/cursus/proceduland/vpolygon.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/queue.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/parabola.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/event.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/edge.js
badd +0 ~/cursus/proceduland/js/libs/voronoi/point.js
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
