const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Rename TIERS to POSITIONS
html = html.replace(/<div class="modal-section-title">TIERS<\/div>/g, '<div class="modal-section-title">POSITIONS</div>');
html = html.replace(/<span>TIERS<\/span>/g, '<span>POSITIONS</span>');
html = html.replace(/<h2 class="modal-title" style="margin:0; font-size: 18px; color: #fff;">Rank Information<\/h2>/g, '<h2 class="modal-title" style="margin:0; font-size: 18px; color: #fff;">Position Information</h2>');
html = html.replace(/onclick="openRankInfo\(\)" title="View Rank Info">! Information<\/div>/g, 'onclick="openRankInfo()" title="View Position Info">! Information</div>');

// 2. Fix the Title Threshold descriptions
html = html.replace(/Obtained 400\+ total points\./g, 'Obtained 80+ total points.');
html = html.replace(/Obtained 250\+ total points\./g, 'Obtained 50+ total points.');
html = html.replace(/Obtained 100\+ total points\./g, 'Obtained 30+ total points.');
html = html.replace(/Obtained 50\+ total points\./g, 'Obtained 15+ total points.');
html = html.replace(/Obtained 20\+ total points\./g, 'Obtained 10+ total points.');
html = html.replace(/Obtained 10\+ total points\./g, 'Obtained 5+ total points.');
html = html.replace(/less than 10 points\./g, 'less than 5 points.');

// 3. Replace the entire infoTabPoints with the Old HTML
const oldPointsHTML = `            <div id="infoTabPoints" style="display: none; flex-direction: column; gap: 15px; animation: fadeOpacityOnly 0.3s ease;">
                <div style="margin-bottom: 5px; color: #e2e8f0; font-size: 14px;">How <span style="text-decoration: underline; text-decoration-color: #888; text-underline-offset: 3px;">ranking points</span> are calculated</div>
                
                <!-- Rank 1 -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="https://i.postimg.cc/Qxw2KYfG/overall.jpg" style="width: 20px; height: 20px; filter: url(#remove-img-bg); margin-right: 8px;">
                        <span style="color: #facc15; font-weight: bold; font-size: 16px;">#1</span>
                    </div>
                    <div style="border-left: 2px solid #facc15; padding-left: 15px; margin-left: 9px;">
                        <div style="display: flex; gap: 10px;">
                            <div class="point-box" style="background: rgba(250, 204, 21, 0.1); border: 1px solid rgba(250, 204, 21, 0.2); border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="18 9 12 3 6 9"></polyline></svg>
                                <span style="color: #facc15; font-size: 12px; font-weight: bold;">10 Points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rank 2 -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="https://i.postimg.cc/7PFvfQBj/tier-2.jpg" style="width: 20px; height: 20px; filter: url(#remove-img-bg); margin-right: 8px;">
                        <span style="color: #94a3b8; font-weight: bold; font-size: 16px;">#2</span>
                    </div>
                    <div style="border-left: 2px solid #94a3b8; padding-left: 15px; margin-left: 9px;">
                        <div style="display: flex; gap: 10px;">
                            <div class="point-box" style="background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="18 9 12 3 6 9"></polyline></svg>
                                <span style="color: #94a3b8; font-size: 12px; font-weight: bold;">7 Points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rank 3 -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <img src="https://i.postimg.cc/d1hX08Gq/tier-3.jpg" style="width: 20px; height: 20px; filter: url(#remove-img-bg); margin-right: 8px;">
                        <span style="color: #d97706; font-weight: bold; font-size: 16px;">#3</span>
                    </div>
                    <div style="border-left: 2px solid #d97706; padding-left: 15px; margin-left: 9px;">
                        <div style="display: flex; gap: 10px;">
                            <div class="point-box" style="background: rgba(217, 119, 6, 0.1); border: 1px solid rgba(217, 119, 6, 0.2); border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="18 9 12 3 6 9"></polyline></svg>
                                <span style="color: #d97706; font-size: 12px; font-weight: bold;">5 Points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rank 4 -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="width: 20px; height: 20px; margin-right: 8px; display: flex; align-items: center; justify-content: center; opacity: 0;"></div>
                        <span style="color: #94a3b8; font-weight: bold; font-size: 16px;">#4</span>
                    </div>
                    <div style="border-left: 2px solid #475569; padding-left: 15px; margin-left: 9px;">
                        <div style="display: flex; gap: 10px;">
                            <div class="point-box" style="background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="18 9 12 3 6 9"></polyline></svg>
                                <span style="color: #94a3b8; font-size: 12px; font-weight: bold;">3 Points</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Rank 5 -->
                <div>
                    <div style="display: flex; align-items: center; margin-bottom: 8px;">
                        <div style="width: 20px; height: 20px; margin-right: 8px; display: flex; align-items: center; justify-content: center; opacity: 0;"></div>
                        <span style="color: #94a3b8; font-weight: bold; font-size: 16px;">#5</span>
                    </div>
                    <div style="border-left: 2px solid #475569; padding-left: 15px; margin-left: 9px;">
                        <div style="display: flex; gap: 10px;">
                            <div class="point-box" style="background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.2); border-radius: 20px; padding: 4px 12px; display: flex; align-items: center; gap: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline><polyline points="18 9 12 3 6 9"></polyline></svg>
                                <span style="color: #94a3b8; font-size: 12px; font-weight: bold;">1 Point</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

html = html.replace(/<div id="infoTabPoints" style="display: none; flex-direction: column; gap: 15px; animation: fadeOpacityOnly 0\.3s ease;">[\s\S]*?<!-- Rules Modal -->/m, oldPointsHTML + '\n\n<!-- Rules Modal -->');

fs.writeFileSync('index.html', html);
console.log('Fixed TIERS text and Points tab HTML!');
