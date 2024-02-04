const _l = (function* (){
    for(const line of data.split("\n")) {
        if(!/^\s*\/\//.test(line) && !/^\s*$/.test(line)) {
            yield line.trim()
        }
    }
})()
let line
nextLine = () => {line = _l.next().value; return line}

title = nextLine()
version = nextLine()
repo = nextLine()

console.assert(nextLine()=="Description:")

desc = ""
for(nextLine();line!="Axes:"&&line!=null;nextLine()) {desc+=` ${line}`}

nextLine()
axes = []
while(line!="Buttons:"&&line!=null) {
  let axis={n:line,ln:nextLine(),ld:nextLine(),li:nextLine(),lc:nextLine(),rn:nextLine(),rd:nextLine(),ri:nextLine(),rc:nextLine(),t:[]}
  for(nextLine();/^=/.test(line);nextLine()){axis.t.push(line.slice(1).trim())}
  axes.push(axis)
}

buttons = []
while(nextLine()!="Ideologies:"&&line!=null){buttons.push({n:line,m:parseInt(nextLine()),c:nextLine(),f:nextLine()})}

nextLine()
ideologies = []
while(line!="Questions:"&&line!=null) {
  let ideology={n:line,e:{}}
  for(nextLine();/^-?[0-9]+(.[0-9]+)?/.test(line);nextLine()){ideology.e[line.match(/^-?[0-9]+(.[0-9]+)?(.*)$/)[2].trim()]=parseInt(line.match(/^-?[0-9]+(.[0-9]+)?/)[0])}
  ideologies.push(ideology)
}

nextLine()
questions = []
while(line!=null) {
  let q={q:line,e:{}}
  for(nextLine();/^(\+|-)/.test(line);nextLine()){q.e[line.match(/^(\+|-)[0-9]+(.[0-9]+)?(.*)$/)[3].trim()]=parseInt(line.match(/^(\+|-)[0-9]+(.[0-9]+)?/)[0])}
  questions.push(q)
}