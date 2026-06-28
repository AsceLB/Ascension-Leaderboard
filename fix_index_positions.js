const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Revert calcPoints and POINTS mapping
html = html.replace(/const POSITION_POINTS = \{[\s\S]*?\};/, 'const POSITION_POINTS = { 1: 10, 2: 7, 3: 5, 4: 3, 5: 1 };');

// In getBadgeColor, remove HT/LT specific logic
html = html.replace(/if \(tierStr\.includes\('1'\)\) color = '#dfa539';[\s\S]*?else if \(tierStr\.includes\('5'\)\) color = '#b91c1c';/, 
`if (tierStr === '1' || tierStr.includes('1')) color = '#dfa539';
        else if (tierStr === '2' || tierStr.includes('2')) color = '#aabac6';
        else if (tierStr === '3' || tierStr.includes('3')) color = '#be733f';`);

// In renderBoardView, change columnsData
html = html.replace(/const columnsData = \[[\s\S]*?\];/, 
`const columnsData = [
            { num: 1, title: "#1", iconSrc: IMG.tier1, class: "col-header-1" },
            { num: 2, title: "#2", iconSrc: IMG.tier2, class: "col-header-2" },
            { num: 3, title: "#3", iconSrc: IMG.tier3, class: "col-header-3" },
            { num: 4, title: "#4", iconSrc: null, class: "col-header-4" },
            { num: 5, title: "#5", iconSrc: null, class: "col-header-5" }
        ];`);

// In renderBoardView matchingPlayers filter
html = html.replace(/if \(v === 'HT' \+ colInfo\.num \|\| v === 'LT' \+ colInfo\.num\) return true;/g, 'if (v === colInfo.num) return true;');
html = html.replace(/if \(pk === 'HT' \+ colInfo\.num \|\| pk === 'LT' \+ colInfo\.num\) return true;/g, 'if (pk === colInfo.num) return true;');
html = html.replace(/if \(v === 'rHT' \+ colInfo\.num \|\| v === 'rLT' \+ colInfo\.num\) return true;/g, 'if (v === "r" + colInfo.num) return true;');

// In renderBoardView sorting
html = html.replace(/if \(pk === 'HT' \+ colInfo\.num \|\| pk === 'LT' \+ colInfo\.num\) return 3; \/\/ Peak\s+if \(v === 'HT' \+ colInfo\.num\) return 2; \/\/ HT\s+if \(v === 'LT' \+ colInfo\.num\) return 1; \/\/ LT/g,
`if (pk === colInfo.num) return 3; // Peak
                    if (v === colInfo.num) return 2; // Active`);

// In renderPointBoxes, it currently splits into HT/LT columns. Let's replace the whole function with a simple top N list
const pointsReplacement = `
    function renderPointBoxes() {
        const board = document.getElementById('boardView');
        board.innerHTML = '<div class="points-header" style="text-align:center; font-size: 2rem; color: #fff; margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 2px;">Overall Points</div>';
        
        let sorted = [...players].sort((a,b) => b.totalPoints - a.totalPoints).filter(p => p.totalPoints > 0);
        
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        container.style.maxWidth = '600px';
        container.style.margin = '0 auto';
        
        sorted.forEach((p, idx) => {
            let color = idx === 0 ? '#dfa539' : idx === 1 ? '#aabac6' : idx === 2 ? '#be733f' : '#64748b';
            
            const card = document.createElement('div');
            card.style.display = 'flex';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'center';
            card.style.padding = '15px 20px';
            card.style.background = 'var(--card-bg)';
            card.style.border = \`1px solid \${color}\`;
            card.style.borderRadius = '10px';
            card.style.cursor = 'pointer';
            card.onclick = () => openPlayerProfile(p.name);
            
            const left = document.createElement('div');
            left.style.display = 'flex';
            left.style.alignItems = 'center';
            left.style.gap = '15px';
            
            const rankSpan = document.createElement('span');
            rankSpan.textContent = \`#\${idx + 1}\`;
            rankSpan.style.color = color;
            rankSpan.style.fontWeight = 'bold';
            rankSpan.style.fontSize = '1.2rem';
            rankSpan.style.width = '30px';
            
            const avatar = document.createElement('img');
            avatar.src = \`https://mc-heads.net/avatar/\${p.name}/30\`;
            avatar.style.borderRadius = '5px';
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = capitalizeName(p.name);
            nameSpan.style.color = '#fff';
            nameSpan.style.fontWeight = '600';
            
            left.appendChild(rankSpan);
            left.appendChild(avatar);
            left.appendChild(nameSpan);
            
            const ptsSpan = document.createElement('span');
            ptsSpan.textContent = \`\${p.totalPoints} pts\`;
            ptsSpan.style.color = color;
            ptsSpan.style.fontWeight = 'bold';
            
            card.appendChild(left);
            card.appendChild(ptsSpan);
            container.appendChild(card);
        });
        
        board.appendChild(container);
    }
`;
html = html.replace(/function renderPointBoxes\(\) \{[\s\S]*?function renderLeaderboard\(\)/, pointsReplacement + '\n\n    function renderLeaderboard()');

// Fix openPlayerProfile badge colors
html = html.replace(/else if \(tierStr\.includes\('HT4'\)\) color = '#a855f7';[\s\S]*?else if \(tierStr\.includes\('LT5'\)\) color = '#b91c1c';/, '');

// Change '#${tierStr}' to '#${tierStr}' is fine because tierStr will be numeric!

fs.writeFileSync('index.html', html);
console.log('Index fixed!');
