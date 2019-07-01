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
exe '1resize ' . ((&lines * 13 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 78 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 93 + 182) / 365)
exe '5resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 92 + 182) / 365)
exe '6resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 92 + 182) / 365)
exe '7resize ' . ((&lines * 23 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
exe '8resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 92 + 182) / 365)
argglobal
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 6) / 13)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
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
let s:l = 88 - ((40 * winheight(0) + 39) / 78)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
88
normal! 067|
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
62
normal! zo
62
normal! zo
63
normal! zo
64
normal! zo
75
normal! zo
75
normal! zo
76
normal! zo
77
normal! zo
86
normal! zo
118
normal! zo
170
normal! zo
170
normal! zo
173
normal! zo
200
normal! zo
200
normal! zo
209
normal! zo
209
normal! zo
let s:l = 232 - ((51 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
232
normal! 010|
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
let s:l = 1 - ((0 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
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
let s:l = 57 - ((31 * winheight(0) + 11) / 22)
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
let s:l = 1 - ((0 * winheight(0) + 11) / 22)
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
let s:l = 34 - ((18 * winheight(0) + 11) / 23)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
34
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=92 ++rows=22 
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 11) / 22)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe '1resize ' . ((&lines * 13 + 48) / 96)
exe 'vert 1resize ' . ((&columns * 84 + 182) / 365)
exe '2resize ' . ((&lines * 78 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 3resize ' . ((&columns * 93 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 93 + 182) / 365)
exe '5resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 92 + 182) / 365)
exe '6resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 92 + 182) / 365)
exe '7resize ' . ((&lines * 23 + 48) / 96)
exe 'vert 7resize ' . ((&columns * 92 + 182) / 365)
exe '8resize ' . ((&lines * 22 + 48) / 96)
exe 'vert 8resize ' . ((&columns * 92 + 182) / 365)
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
exe 'vert 1resize ' . ((&columns * 114 + 182) / 365)
exe '2resize ' . ((&lines * 65 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 26 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 46 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 80 + 182) / 365)
exe '6resize ' . ((&lines * 45 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 80 + 182) / 365)
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
125
normal! zo
129
normal! zo
129
normal! zo
135
normal! zo
146
normal! zo
152
normal! zo
152
normal! zo
152
normal! zo
152
normal! zo
153
normal! zo
166
normal! zo
170
normal! zo
171
normal! zo
187
normal! zo
190
normal! zo
191
normal! zo
197
normal! zo
215
normal! zo
219
normal! zo
let s:l = 140 - ((49 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
140
normal! 026|
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
let s:l = 73 - ((30 * winheight(0) + 32) / 65)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
73
normal! 018|
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
let s:l = 174 - ((20 * winheight(0) + 13) / 26)
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
let s:l = 99 - ((62 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
99
normal! 016|
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
let s:l = 38 - ((13 * winheight(0) + 23) / 46)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
38
normal! 0
lcd ~/cursus/proceduland
wincmd w
argglobal
terminal ++curwin ++cols=80 ++rows=45 
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
exe 'vert 1resize ' . ((&columns * 114 + 182) / 365)
exe '2resize ' . ((&lines * 65 + 48) / 96)
exe 'vert 2resize ' . ((&columns * 84 + 182) / 365)
exe '3resize ' . ((&lines * 26 + 48) / 96)
exe 'vert 3resize ' . ((&columns * 84 + 182) / 365)
exe 'vert 4resize ' . ((&columns * 84 + 182) / 365)
exe '5resize ' . ((&lines * 46 + 48) / 96)
exe 'vert 5resize ' . ((&columns * 80 + 182) / 365)
exe '6resize ' . ((&lines * 45 + 48) / 96)
exe 'vert 6resize ' . ((&columns * 80 + 182) / 365)
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
exe 'vert 1resize ' . ((&columns * 182 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 182 + 182) / 365)
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
121
normal! zo
126
normal! zo
let s:l = 137 - ((65 * winheight(0) + 46) / 92)
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
let s:l = 41 - ((40 * winheight(0) + 46) / 92)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
41
normal! 0
lcd ~/cursus/proceduland
wincmd w
exe 'vert 1resize ' . ((&columns * 182 + 182) / 365)
exe 'vert 2resize ' . ((&columns * 182 + 182) / 365)
tabnext 2
badd +1 ~/cursus/proceduland/index.html
badd +1 ~/cursus/proceduland/js
badd +1 ~/cursus/proceduland/js/webworkers/worldWorker.js
badd +0 ~/cursus/proceduland/NetrwTreeListing\ 6
badd +0 ~/cursus/proceduland/js/init.js
badd +1 ~/cursus/proceduland/js/objects/world.js
badd +1 ~/cursus/proceduland/js/eventsControl.js
badd +13 ~/cursus/proceduland/js/materials.js
badd +1 ~/cursus/proceduland/js/tools.js
badd +1 ~/cursus/proceduland/js/gui.js
badd +1 ~/cursus/proceduland/js/webworkers/chunk.js
badd +1 ~/cursus/proceduland/js/webworkers/btt.js
badd +23 ~/cursus/proceduland/js/webworkers/landGeometry.js
badd +1 ~/cursus/proceduland/js/algo/andresCircle.js
badd +1 ~/cursus/proceduland
badd +18 ~/cursus/proceduland/js/libs/three.min.js
badd +1 ~/cursus/proceduland/js/libs/three_105.min.js
badd +21 ~/cursus/proceduland/js/libs/coCoLog.js
badd +1 ~/cursus/proceduland/index.php
badd +1 ~/cursus/proceduland/js/algo
badd +1 ~/cursus/proceduland/js/libs/KeyboardState.js
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
