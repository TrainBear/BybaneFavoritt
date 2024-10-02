const submitButton = document.querySelector('button');
submitButton.addEventListener('click', (e) => {
    handleSubmit()
})

function handleSubmit() {
    // Create set array
    const sets = [];
    for (let i = 201; i <= 234; i++) {
        sets.push(
            {
                id: i,
                score: random[i-201]
                // score: 0
            }
        );
    }
    const light = document.getElementById('light').value;
    const line = document.getElementById('line').value;
    const nextStop = document.getElementById('next-stop').value;
    const joint = document.getElementById('joint').value;
    const expanded = document.getElementById('expanded').value;
    const toby = document.getElementById('toby').value;
    if([light, line, nextStop, joint, expanded, toby].some(s=>s==="-1")){
        alert("Du må fylle ut alle felta!");
        return;
    }

    // Light
    let scoreChange = (light === "0" ? -1 : (light === "1" ? 1 : 0));
    sets.forEach(set => {
        if (set.id <= 213) {
            set.score += scoreChange;
        }else if (set.id >= 215) {
            set.score -= scoreChange;
        }
    });

    // Line
    if(line !== "-1"){
        sets.forEach(set => {
            if(line === "0"){
                set.score += set.id <= 228 ? 1 : -1;
            }else if (line === "1"){
                set.score += set.id >= 229 ? 1 : -1;
            }else if (line === "2"){
                set.score += set.id === 232 ? 1 : (set.id === 234 ? 0.5 : (set.id >= 229 ? 0 : -1));
            }
        });
    }

    // Next stop
    if(nextStop !== "-1"){
        sets.forEach(set => {
            if(nextStop === "0"){
                set.score += set.id <= 217 ? 1 : -1;
            }
            if(nextStop === "1"){
                set.score += set.id >= 220 && set.id <= 228 ? 1 : -1;
            }
            if(nextStop === "2"){
                set.score += set.id >= 229 ? 1 : -1;
            }
        })
    }

    // Joint
    if(joint !== "-1"){
        sets.forEach(set => {
            if(joint === "0"){
                set.score += set.id <= 228 ? 1 : -1;
            }
            if(joint === "1"){
                set.score += set.id >= 229 ? 1 : -1;
            }
        })
    }

    // Expanded
    if(expanded !== "-1"){
        sets.forEach(set => {
            if(expanded === "0"){
                set.score += set.id <= 220 ? 1 : -1;
            }
            if(expanded === "1"){
                set.score += set.id >= 221 ? 1 : -1;
            }
        })
    }

    // Toby
    if(toby !== "-1"){
        sets[207-201].score += toby === "0" ? 1 : 0;
    }

    sets.sort((a, b) => b.score - a.score);
    let s = "Du vil like nummer <strong>" + sets[0].id + "</strong>, <strong>" + sets[1].id + "</strong> og kanskje <strong>" + sets[2].id + "</strong>";
    document.getElementById('result').innerHTML = s;
    document.getElementById('hidden').hidden = false;
}

let random;
try{
    // Try read old random
    random = JSON.parse(document.cookie);
    if (random.length !== 34) {
        throw new Error("Unexpected Cookies");
    }
}catch (e){
    // Create new random
    random = []
    for (let i = 0; i < 34; i++) {
        random.push(Math.random() / 100);
    }
    document.cookie = JSON.stringify(random);
}