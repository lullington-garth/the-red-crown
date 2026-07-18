// loadNodeIndex.js

export async function loadNodeIndex() {
    const res = await fetch('./data/nodeIndex.json');
    return await res.json();
}