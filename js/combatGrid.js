// combatGrid.js
/**
 * Handles creation of the combat grid and cell management
 */

export function createCombatGrid(container) {

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(3,1fr)";
    grid.style.gridTemplateRows = "50px 225px 225px 225px 95px";
    grid.style.gap = "10px";
    grid.style.marginTop = "5px";
    grid.style.background = "transparent";
    container.appendChild(grid);

    const cells = {};

    function createCell(r, c, color, span = 1) {
        const cell = document.createElement("div");
        cell.style.gridRow = r;
        cell.style.gridColumn = span > 1 ? `${c}/span ${span}` : c;
        cell.style.border = "1px solid #888";
        cell.style.borderRadius = "8px";
        cell.style.background = color;
        cell.style.display = "flex";
        cell.style.flexDirection = "column";
        cell.style.alignItems = "flex-start";
        cell.style.justifyContent = "flex-start";
        cell.style.padding = "10px";
        cell.style.position = "relative";
        grid.appendChild(cell);
        return cell;
    }

    function flashCell(cell) {
        if (!cell) return;

        if (!cell.dataset.originalBorder) {
            cell.dataset.originalBorder = cell.style.border;
            cell.dataset.originalBg = cell.style.backgroundColor;
        }

        cell.style.border = "2px solid #888";
        cell.style.backgroundColor = "#ffffff3f";
        cell.style.boxShadow = "0 1px 10px rgba(0, 0, 0, 0.77)";


        setTimeout(() => {
            cell.style.border = cell.dataset.originalBorder;
            cell.style.backgroundColor = cell.dataset.originalBg;
            cell.style.boxShadow = null;
        }, 250);
    }

    // --- NEW ROW 1 (added) --- 
    const title = createCell(1, 1, "transparent");
    title.textContent = "Combat";
    title.style.fontWeight = "bold";
    title.style.fontSize = "18px";
    title.style.alignItems = "center";
    title.style.justifyContent = "center";

    cells["title"] = title;       

    cells["playerEffects"] = createCell(1, 2, "transparent", 2);

    // --- Create grid cells ---
    // Row 2 (was Row 1)
    cells["player"] = createCell(2, 1, "transparent");
    cells["enemy1"] = createCell(2, 2, "transparent");
    cells["enemy2"] = createCell(2, 3, "transparent");

    // Row 3 (was Row 2)
    cells["dice"] = createCell(3, 1, "transparent");
    cells["enemy3"] = createCell(3, 2, "transparent");
    cells["enemy4"] = createCell(3, 3, "transparent");

    // Row 4 (was Row 3)
    cells["spells"] = createCell(4, 1, "transparent");
    cells["enemy5"] = createCell(4, 2, "transparent");
    cells["enemy6"] = createCell(4, 3, "transparent");

    // Row 5 (was Row 4)
    cells["spells"].style.gridRow = "4 / span 2";
    const queuedEnemiesCell = createCell(5, 2, "transparent", 2);
    const invisibleCell = createCell(5, 1, "transparent");
    invisibleCell.style.border = "none";
    invisibleCell.style.pointerEvents = "none";
    invisibleCell.style.background = "transparent";

    cells["queued"] = queuedEnemiesCell;

    return { grid, cells, flashCell };
}