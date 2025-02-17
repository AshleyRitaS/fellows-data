const fullRectSpaceTest = {x:100000, y: 50000};
const originOffsetTest = {x:-53000, y:-29000}
function toLocalGrid(loc) {
    return {x:loc.y, y:-loc.x}
}

function offsetToLocalOrigin(loc, originOffset) {
    return {x:loc.x - originOffset.x, y:loc.y - originOffset.y}
}

function scaleToLocal(loc, localRect, fullRectSpace) {
    return {x:loc.x/fullRectSpace.x * localRect.x, y:loc.y / fullRectSpace.y * localRect.y}
}

export default {
    transformToLocal: function(loc, localRect, fullRectSpace, originOffset) {
        return scaleToLocal(offsetToLocalOrigin(toLocalGrid(loc), originOffset || originOffsetTest), localRect, fullRectSpace || fullRectSpaceTest);
    },
}