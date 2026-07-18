// shopVariableResolver.js

export function resolveShopVariable(path, playerStats) {

    const wizard =
        (playerStats.wizardColor || "").toLowerCase();

    switch (path) {

        case "bathhouseShop":
            if (wizard === "green") {return ["0174"];}
            if (wizard === "blue") { return ["0309"];}
            if (wizard === "yellow") { return ["0173"];}
            if (wizard === "red") { return ["0175"];}

        case "clockShop":
            if (wizard === "green") {return ["0318", "0319", "0320", "0321"];}
            if (wizard === "blue") { return ["0310", "0311", "0312", "0313"];}
            if (wizard === "yellow") { return ["0314", "0315", "0316", "0317"];}
            if (wizard === "red") { return ["0322", "0323", "0324", "0325"];}

        case "marketShop":
            if (wizard === "green") {return ["0341", "0342", "0343", "0344", "0345"];}
            if (wizard === "blue") { return ["0336", "0337", "0338", "0339", "0340"];}
            if (wizard === "yellow") { return ["0346", "0347", "0348", "0349", "0350"];}
            if (wizard === "red") { return ["0351", "0352", "0353", "0354", "0355"];}

        case "potterShop":
            if (wizard === "green") {return ["0069", "0070", "0071", "0072", "0073"];}
            if (wizard === "blue") { return ["0064", "0065", "0066", "0067", "0068"];}
            if (wizard === "yellow") { return ["0059", "0060", "0061", "0062", "0063"];}
            if (wizard === "red") { return ["0068", "0060", "0061", "0072", "0063"];}

            return ["0001"];
    }
    
    return [];
}
