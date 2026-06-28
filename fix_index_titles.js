const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newTitleAndTheme = `    function getTitle(points) {
        if (points >= 80) return 'Combat Grandmaster';
        if (points >= 50) return 'Combat Master';
        if (points >= 30) return 'Combat Ace';
        if (points >= 15) return 'Combat Specialist';
        if (points >= 10) return 'Combat Cadet';
        if (points >= 5)  return 'Combat Novice';
        return 'Rookie';
    }

    function getThemeColor(points) {
        if (points >= 80) return { main: '#ff2a2a', glow: 'rgba(255, 42, 42, 0.4)', bgAlpha: 'rgba(255, 42, 42, 0.05)' }; // Grandmaster (Red)
        if (points >= 50) return { main: '#ffd700', glow: 'rgba(255, 215, 0, 0.4)', bgAlpha: 'rgba(255, 215, 0, 0.05)' }; // Master (Gold)
        if (points >= 30) return { main: '#00e676', glow: 'rgba(0, 230, 118, 0.4)', bgAlpha: 'rgba(0, 230, 118, 0.05)' }; // Ace (Emerald)
        if (points >= 15) return { main: '#00e5ff', glow: 'rgba(0, 229, 255, 0.4)', bgAlpha: 'rgba(0, 229, 255, 0.05)' }; // Specialist (Cyan)
        if (points >= 10) return { main: '#4287f5', glow: 'rgba(66, 135, 245, 0.4)', bgAlpha: 'rgba(66, 135, 245, 0.05)' }; // Cadet (Blue)
        if (points >= 5)  return { main: '#b0bec5', glow: 'rgba(176, 190, 197, 0.4)', bgAlpha: 'rgba(176, 190, 197, 0.05)' }; // Novice (Silver)
        return { main: '#cd7f32', glow: 'rgba(205, 127, 50, 0.4)', bgAlpha: 'rgba(205, 127, 50, 0.05)' }; // Rookie (Bronze)
    }

    function getRankIcon(points) {
        if (points >= 80) return 'https://i.postimg.cc/Y2RdcHbH/combat-grandmaster.webp';
        if (points >= 50) return 'https://i.postimg.cc/TPbtB5HD/combat-master.webp';
        if (points >= 30) return 'https://i.postimg.cc/qBx5knBz/combat-ace.jpg';
        if (points >= 15) return 'https://i.postimg.cc/pL6SwHWk/combat-specialist.jpg';
        if (points >= 10) return 'https://i.postimg.cc/59BZ6TgY/combat-cadet.jpg';
        if (points >= 5)  return 'https://i.postimg.cc/FHCthSpm/combat-novice.jpg';
        return 'https://i.postimg.cc/Y9Dvsf2v/rookie.webp';
    }`;

// Replace everything from getTitle to getRankIcon's end
html = html.replace(/function getTitle\(points\) \{[\s\S]*?return 'https:\/\/i\.postimg\.cc\/Y9Dvsf2v\/rookie\.webp';\s*\}/, newTitleAndTheme);

fs.writeFileSync('index.html', html);
console.log('Title thresholds fixed!');
